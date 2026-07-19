import * as duckdb from "@duckdb/duckdb-wasm";
import * as Teta from "@teta/teta";

type MonacoModule = typeof import("monaco-editor");

type Example = {
  id: string;
  title: string;
  code: string;
  sql: string;
};

type Section = {
  id: string;
  title: string;
  intro?: string;
  examples: Example[];
};

type TutorialData = {
  title: string;
  dialect: "postgresql";
  sections: Section[];
};

type FlatSection = {
  id: string;
  sectionId: string;
  sectionTitle: string;
  sectionIntro?: string;
  example: Example;
};

type AppHandle = {
  init: (monaco: MonacoModule) => Promise<void>;
};

type AppWindow = Window & { App?: AppHandle };

type DuckDbHandle = {
  db: duckdb.AsyncDuckDB;
  conn: duckdb.AsyncDuckDBConnection;
};

type ExamplePlaygroundRefs = {
  editorHost: HTMLElement;
  sqlOutput: HTMLElement;
  tsError: HTMLElement;
  runnerError: HTMLElement;
  results: HTMLElement;
  runTsButton: HTMLButtonElement;
  runSqlButton: HTMLButtonElement;
  resetButton: HTMLButtonElement;
  copySqlButton: HTMLButtonElement;
  statusEl: HTMLElement;
};

const DIALECT = "postgresql" as const;
const TUTORIAL_PROGRESS_KEY = "teta-tutorial-completed-examples";

const DATASETS = [
  { name: "world", file: "./data/world.csv" },
  { name: "nobel", file: "./data/nobel.csv" },
  { name: "game", file: "./data/game.csv" },
  { name: "goal", file: "./data/goal.csv" },
  { name: "eteam", file: "./data/eteam.csv" },
  { name: "movie", file: "./data/movie.csv" },
  { name: "actor", file: "./data/actor.csv" },
  { name: "casting", file: "./data/casting.csv" },
  { name: "teacher", file: "./data/teacher.csv" },
  { name: "dept", file: "./data/dept.csv" },
  { name: "stops", file: "./data/stop.csv" },
  { name: "route", file: "./data/route.csv" },
];

let duckdbHandle: DuckDbHandle | null = null;
let duckdbStatus = "DuckDB idle";
const duckdbStatusListeners = new Set<(message: string) => void>();
let monacoConfigured = false;

function getCompletedExampleIds() {
  try {
    const stored = window.localStorage.getItem(TUTORIAL_PROGRESS_KEY);
    if (!stored) {
      return new Set<string>();
    }
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) {
      return new Set<string>();
    }
    return new Set(parsed.filter((id): id is string => typeof id === "string"));
  } catch {
    return new Set<string>();
  }
}

function saveCompletedExampleIds(completedExampleIds: Set<string>) {
  try {
    window.localStorage.setItem(
      TUTORIAL_PROGRESS_KEY,
      JSON.stringify([...completedExampleIds]),
    );
  } catch {
    // Progress is nonessential, so the playground remains usable without storage.
  }
}

function getStatusState(message: string) {
  if (message.toLowerCase().includes("failed")) {
    return "error";
  }
  if (message.startsWith("Ready")) {
    return "ready";
  }
  return "loading";
}

async function loadTutorial(): Promise<TutorialData> {
  const res = await fetch("./tutorial.json");
  if (!res.ok) {
    throw new Error("Failed to load tutorial.json");
  }
  return (await res.json()) as TutorialData;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function colorizeCodeBlock(
  monaco: MonacoModule | null,
  element: HTMLElement,
  language: string,
) {
  if (!monaco) {
    return;
  }
  element.setAttribute("data-lang", language);
  monaco.editor
    .colorizeElement(element, { theme: "vs-dark" })
    .catch(() => undefined);
}

async function configureMonaco(monaco: MonacoModule) {
  if (monacoConfigured) {
    return;
  }

  const tetaTypes = await fetch("./teta.d.ts").then((res) => res.text());
  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    tetaTypes,
    "file:///node_modules/@teta/teta/index.d.ts",
  );

  monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);
  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.ES2020,
    module: monaco.languages.typescript.ModuleKind.ESNext,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    allowNonTsExtensions: true,
    strict: true,
    noEmit: false,
  });

  monacoConfigured = true;
}

function renderTutorial(data: TutorialData, monaco: MonacoModule | null) {
  const nav = document.getElementById("nav");
  const content = document.getElementById("content");
  const navSearch = document.getElementById(
    "nav-search",
  ) as HTMLInputElement | null;
  const lessonProgress = document.getElementById("lesson-progress");
  const lessonMenu = document.getElementById("lesson-menu");
  const sidebar = nav?.closest(".sidebar");

  if (!nav || !content) {
    return;
  }

  const flatSections: FlatSection[] = [];
  for (const section of data.sections) {
    for (const example of section.examples) {
      flatSections.push({
        id: `${section.id}-${example.id}`,
        sectionId: section.id,
        sectionTitle: section.title,
        sectionIntro: section.intro,
        example,
      });
    }
  }

  const completedExampleIds = getCompletedExampleIds();
  const navLinks = new Map<string, HTMLAnchorElement>();
  const navGroups = new Map<string, HTMLDivElement>();
  let activeDispose: (() => void) | null = null;

  const updateProgress = () => {
    const completedCount = flatSections.filter((entry) =>
      completedExampleIds.has(entry.id),
    ).length;
    if (lessonProgress) {
      lessonProgress.textContent = `${completedCount} of ${flatSections.length}`;
    }
    for (const [id, link] of navLinks) {
      link.classList.toggle("completed", completedExampleIds.has(id));
    }
  };

  const filterNavigation = () => {
    const searchTerm = navSearch?.value.trim().toLocaleLowerCase() ?? "";
    for (const group of navGroups.values()) {
      let hasVisibleItem = false;
      for (const link of group.querySelectorAll<HTMLAnchorElement>("a")) {
        const matches =
          !searchTerm ||
          link.textContent?.toLocaleLowerCase().includes(searchTerm) === true;
        link.classList.toggle("search-hidden", !matches);
        hasVisibleItem ||= matches;
      }
      group.classList.toggle("search-hidden", !hasVisibleItem);
      if (searchTerm && hasVisibleItem) {
        group.classList.add("open");
      }
    }
  };

  const buildExampleView = (entry: FlatSection) => {
    const sectionEl = document.createElement("section");
    sectionEl.className = "section";
    sectionEl.id = entry.id;

    const header = document.createElement("div");
    header.className = "section-heading";

    const heading = document.createElement("h2");
    heading.textContent = entry.sectionTitle;
    header.appendChild(heading);

    if (entry.sectionIntro) {
      const intro = document.createElement("p");
      intro.textContent = entry.sectionIntro;
      header.appendChild(intro);
    }
    sectionEl.appendChild(header);

    const playground = document.createElement("article");
    playground.className = "playground example-playground";

    const playgroundHeader = document.createElement("div");
    playgroundHeader.className = "playground-header";

    const exampleTitle = document.createElement("h3");
    exampleTitle.textContent = entry.example.title;
    playgroundHeader.appendChild(exampleTitle);

    const actions = document.createElement("div");
    actions.className = "example-actions";

    const runTsButton = document.createElement("button");
    runTsButton.type = "button";
    runTsButton.className = "action-button secondary";
    runTsButton.textContent = "Generate SQL";

    const runSqlButton = document.createElement("button");
    runSqlButton.type = "button";
    runSqlButton.className = "action-button primary";
    runSqlButton.textContent = "Run query";

    const resetButton = document.createElement("button");
    resetButton.type = "button";
    resetButton.className = "action-button secondary";
    resetButton.textContent = "Reset code";
    resetButton.disabled = true;

    const statusEl = document.createElement("span");
    statusEl.className = "runner-status";

    actions.append(runTsButton, runSqlButton, resetButton, statusEl);
    playgroundHeader.appendChild(actions);
    playground.appendChild(playgroundHeader);

    const grid = document.createElement("div");
    grid.className = "example-grid";

    const editorPanel = document.createElement("div");
    editorPanel.className = "panel";

    const editorTitle = document.createElement("div");
    editorTitle.className = "output-title";
    editorTitle.textContent = "TypeScript (Teta)";

    const editorHost = document.createElement("div");
    editorHost.className = "editor";

    editorPanel.append(editorTitle, editorHost);

    const sqlPanel = document.createElement("div");
    sqlPanel.className = "panel";

    const sqlTitle = document.createElement("div");
    sqlTitle.className = "output-title";

    const sqlLabel = document.createElement("span");
    sqlLabel.textContent = "Generated SQL";

    const copySqlButton = document.createElement("button");
    copySqlButton.type = "button";
    copySqlButton.className = "action-button tertiary";
    copySqlButton.textContent = "Copy SQL";
    copySqlButton.disabled = true;

    sqlTitle.append(sqlLabel, copySqlButton);

    const sqlOutput = document.createElement("pre");
    sqlOutput.className = "code-block";
    sqlOutput.setAttribute("data-lang", "sql");

    const tsError = document.createElement("div");
    tsError.className = "output-error";

    sqlPanel.append(sqlTitle, sqlOutput, tsError);
    grid.append(editorPanel, sqlPanel);
    playground.appendChild(grid);

    const runner = document.createElement("div");
    runner.className = "sql-runner";

    const runnerTitle = document.createElement("div");
    runnerTitle.className = "output-title";
    runnerTitle.textContent = "Query Results";

    const runnerError = document.createElement("div");
    runnerError.className = "output-error";

    const results = document.createElement("div");
    results.className = "sql-results";

    runner.append(runnerTitle, runnerError, results);
    playground.appendChild(runner);

    sectionEl.appendChild(playground);

    return {
      sectionEl,
      refs: {
        editorHost,
        sqlOutput,
        tsError,
        runnerError,
        results,
        runTsButton,
        runSqlButton,
        resetButton,
        copySqlButton,
        statusEl,
      },
    };
  };

  const selectExample = (id: string | null) => {
    let entry = flatSections.find((flat) => flat.id === id) ?? null;
    if (!entry && id) {
      entry = flatSections.find((flat) => flat.sectionId === id) ?? null;
    }
    if (!entry) {
      entry = flatSections[0] ?? null;
    }
    if (!entry) {
      return;
    }

    if (activeDispose) {
      activeDispose();
      activeDispose = null;
    }

    content.innerHTML = "";
    const view = buildExampleView(entry);
    content.appendChild(view.sectionEl);
    if (monaco) {
      activeDispose = setupExamplePlayground(
        monaco,
        entry.example,
        view.refs,
        () => {
          if (completedExampleIds.has(entry.id)) {
            return;
          }
          completedExampleIds.add(entry.id);
          saveCompletedExampleIds(completedExampleIds);
          updateProgress();
        },
      );
    }

    for (const link of nav.querySelectorAll("a")) {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${entry.id}`,
      );
    }
    for (const [sectionId, group] of navGroups.entries()) {
      const isOpen = sectionId === entry.sectionId;
      group.classList.toggle("open", isOpen);
      group.querySelector(".nav-title")?.setAttribute(
        "aria-expanded",
        String(isOpen),
      );
    }
    if (window.matchMedia("(max-width: 980px)").matches) {
      sidebar?.classList.remove("menu-open");
      lessonMenu?.setAttribute("aria-expanded", "false");
      if (lessonMenu) {
        lessonMenu.textContent = "Browse";
      }
    }
    if (window.location.hash !== `#${entry.id}`) {
      history.replaceState(null, "", `#${entry.id}`);
    }
  };

  nav.innerHTML = "";
  content.innerHTML = "";

  for (const section of data.sections) {
    const group = document.createElement("div");
    group.className = "nav-group";
    group.dataset.sectionId = section.id;

    const label = document.createElement("button");
    label.type = "button";
    label.className = "nav-title";
    label.textContent = section.title;
    label.setAttribute("aria-expanded", "false");
    label.addEventListener("click", () => {
      const isOpen = group.classList.toggle("open");
      label.setAttribute("aria-expanded", String(isOpen));
    });
    group.appendChild(label);

    const items = document.createElement("div");
    items.className = "nav-items";

    for (const example of section.examples) {
      const flatId = `${section.id}-${example.id}`;
      const link = document.createElement("a");
      link.href = `#${flatId}`;
      link.textContent = example.title;
      navLinks.set(flatId, link);
      link.addEventListener("click", (event) => {
        event.preventDefault();
        if (window.location.hash === `#${flatId}`) {
          selectExample(flatId);
        } else {
          window.location.hash = flatId;
        }
      });
      items.appendChild(link);
    }

    group.appendChild(items);
    nav.appendChild(group);
    navGroups.set(section.id, group);
  }

  navSearch?.addEventListener("input", filterNavigation);
  lessonMenu?.addEventListener("click", () => {
    const isOpen = sidebar?.classList.toggle("menu-open") ?? false;
    lessonMenu.setAttribute("aria-expanded", String(isOpen));
    lessonMenu.textContent = isOpen ? "Close" : "Browse";
  });
  updateProgress();
  selectExample(window.location.hash.slice(1) || null);
  window.addEventListener("hashchange", () =>
    selectExample(window.location.hash.slice(1)),
  );
}

function prepareUserCode(code: string) {
  let cleaned = code;

  cleaned = cleaned.replace(/^[\t ]*import[^;]*;?\n?/gm, "");
  cleaned = cleaned.replace(/^[\t ]*export\s+default\s+/gm, "const query = ");
  cleaned = cleaned.replace(
    /^[\t ]*export\s+const\s+query\s*=/gm,
    "const query =",
  );
  cleaned = cleaned.replace(/^[\t ]*export\s+/gm, "");

  return cleaned;
}

function executeCode(compiled: string) {
  const runtimeGlobals = `const teta = __teta;\nconst {
    add, and, asc, cast, charLength, coalesce, concat, count, desc, div, eq,
    dropOverlapRight, filter, fold, full, group, gt, gte, inner, isNotNull, isNull, join, left, like, lit,
    lt, lte, map, max, min, mul, ne, not, or, pipe, replace, right, round,
    sort, sub, substring, sum, table, t, when
  } = __teta;`;

  const runner = new Function(
    "__teta",
    `"use strict";\n${runtimeGlobals}\n${compiled}\nreturn typeof query !== "undefined" ? query : undefined;`,
  );

  const result = runner(Teta as unknown as Record<string, unknown>);

  if (!result) {
    throw new Error("No query was produced. Assign a Query to `query`.");
  }

  if (typeof Teta.toSql !== "function") {
    throw new Error("Teta's toSql() renderer is unavailable.");
  }

  return Teta.toSql(result as Teta.Query<Teta.QueryColumns>, {
    dialect: DIALECT,
    format: "pretty",
  });
}

function setDuckDbStatus(message: string) {
  duckdbStatus = message;
  for (const listener of duckdbStatusListeners) {
    listener(message);
  }
}

function registerDuckDbStatus(element: HTMLElement) {
  const listener = (message: string) => {
    element.textContent = message;
    element.dataset.state = getStatusState(message);
  };
  listener(duckdbStatus);
  duckdbStatusListeners.add(listener);
  return () => duckdbStatusListeners.delete(listener);
}

async function loadCsvTable(
  db: duckdb.AsyncDuckDB,
  conn: duckdb.AsyncDuckDBConnection,
  name: string,
  file: string,
) {
  const res = await fetch(file);
  if (!res.ok) {
    console.warn(`Dataset ${name} not found at ${file}`);
    return false;
  }

  const text = await res.text();
  const fileName = `${name}.csv`;
  await db.registerFileText(fileName, text);
  await conn.query(
    `CREATE OR REPLACE TABLE ${name} AS SELECT * FROM read_csv_auto('${fileName}', HEADER=true);`,
  );
  return true;
}

async function initDuckDb(): Promise<DuckDbHandle> {
  setDuckDbStatus("Initializing DuckDB...");

  const base = window.location.href;
  const bundles: duckdb.DuckDBBundles = {
    mvp: {
      mainModule: new URL("./duckdb/duckdb-mvp.wasm", base).toString(),
      mainWorker: new URL(
        "./duckdb/duckdb-browser-mvp.worker.js",
        base,
      ).toString(),
    },
    eh: {
      mainModule: new URL("./duckdb/duckdb-eh.wasm", base).toString(),
      mainWorker: new URL(
        "./duckdb/duckdb-browser-eh.worker.js",
        base,
      ).toString(),
    },
  };

  const fallbackBundle: duckdb.DuckDBBundle = {
    mainModule: bundles.mvp.mainModule,
    mainWorker: bundles.mvp.mainWorker,
    pthreadWorker: null,
  };

  let bundle = await duckdb.selectBundle(bundles);
  if (!bundle) {
    bundle = fallbackBundle;
  }
  if (!bundle.mainWorker || !bundle.mainModule) {
    throw new Error(
      "DuckDB bundle assets missing. Run build to copy duckdb files.",
    );
  }
  const worker = new Worker(bundle.mainWorker);
  const logger = new duckdb.ConsoleLogger(duckdb.LogLevel.WARNING);
  const db = new duckdb.AsyncDuckDB(logger, worker);
  await db.instantiate(bundle.mainModule, bundle.pthreadWorker);
  const conn = await db.connect();

  setDuckDbStatus("Loading datasets...");
  let loadedCount = 0;
  for (const dataset of DATASETS) {
    const loaded = await loadCsvTable(db, conn, dataset.name, dataset.file);
    if (loaded) {
      loadedCount += 1;
    }
  }

  setDuckDbStatus(
    loadedCount > 0
      ? `Ready (${loadedCount} tables loaded)`
      : "Ready (no datasets found)",
  );

  return { db, conn };
}

function renderResults(
  rows: Array<Record<string, unknown>>,
  resultsEl: HTMLElement,
) {
  if (rows.length === 0) {
    resultsEl.innerHTML = '<div class="output-error">No rows returned.</div>';
    return;
  }

  const firstRow = rows[0];
  if (!firstRow) {
    resultsEl.innerHTML = '<div class="output-error">No rows returned.</div>';
    return;
  }
  const columns = Object.keys(firstRow);
  const headerCells = columns
    .map((col) => `<th>${escapeHtml(col)}</th>`)
    .join("");
  const bodyRows = rows
    .map((row) => {
      const cells = columns
        .map((col) => {
          const value = row[col];
          const text =
            value === null || value === undefined ? "" : String(value);
          return `<td>${escapeHtml(text)}</td>`;
        })
        .join("");
      return `<tr>${cells}</tr>`;
    })
    .join("");

  resultsEl.innerHTML = `
    <table>
      <thead>
        <tr>${headerCells}</tr>
      </thead>
      <tbody>
        ${bodyRows}
      </tbody>
    </table>
  `;
}

async function runDuckDbQuery(
  sql: string,
  resultsEl: HTMLElement,
  errorEl: HTMLElement,
) {
  try {
    if (!duckdbHandle) {
      duckdbHandle = await initDuckDb();
    }

    errorEl.textContent = "";
    resultsEl.innerHTML = "";
    const result = await duckdbHandle.conn.query(sql);
    const rows = result.toArray() as Array<Record<string, unknown>>;
    renderResults(rows, resultsEl);
    return true;
  } catch (err) {
    errorEl.textContent = err instanceof Error ? err.message : String(err);
    return false;
  }
}

function setupExamplePlayground(
  monaco: MonacoModule,
  example: Example,
  refs: ExamplePlaygroundRefs,
  onCompleted: () => void,
) {
  const {
    editorHost,
    sqlOutput,
    tsError,
    runnerError,
    results,
    runTsButton,
    runSqlButton,
    resetButton,
    copySqlButton,
    statusEl,
  } = refs;

  const safeId = encodeURIComponent(example.id);
  const editorModel = monaco.editor.createModel(
    example.code,
    "typescript",
    monaco.Uri.parse(`inmemory://model/${safeId}.ts`),
  );
  const workerModel = monaco.editor.createModel(
    "",
    "typescript",
    monaco.Uri.parse(`inmemory://model/${safeId}-worker.ts`),
  );

  const editor = monaco.editor.create(editorHost, {
    model: editorModel,
    language: "typescript",
    theme: "vs-dark",
    minimap: { enabled: false },
    fontSize: 13,
    wordWrap: "bounded",
    wordWrapColumn: 84,
    wrappingIndent: "indent",
    wrappingStrategy: "advanced",
    automaticLayout: true,
    scrollbar: { vertical: "auto", horizontal: "hidden" },
  });

  let latestSql: string | null = null;
  let executionInProgress = false;
  let copyResetTimeout: number | undefined;
  const clearStatus = registerDuckDbStatus(statusEl);
  const controller = new AbortController();

  const generateSql = async () => {
    tsError.textContent = "";
    sqlOutput.textContent = "";
    copySqlButton.disabled = true;

    try {
      const cleaned = prepareUserCode(editor.getValue());
      workerModel.setValue(cleaned);

      const worker = await monaco.languages.typescript.getTypeScriptWorker();
      const client = await worker(workerModel.uri);
      const emit = await client.getEmitOutput(workerModel.uri.toString());

      if (emit.emitSkipped) {
        throw new Error("TypeScript emit failed. Check the diagnostics.");
      }

      const jsOutput = emit.outputFiles.find((file) =>
        file.name.endsWith(".js"),
      );

      if (!jsOutput) {
        throw new Error("No JavaScript output was generated.");
      }

      const sql = executeCode(jsOutput.text);
      latestSql = sql;
      sqlOutput.textContent = sql;
      colorizeCodeBlock(monaco, sqlOutput, "sql");
      copySqlButton.disabled = false;
      return sql;
    } catch (err) {
      latestSql = null;
      tsError.textContent = err instanceof Error ? err.message : String(err);
      return null;
    }
  };

  const setExecutionState = (
    isRunning: boolean,
    action: "generate" | "query",
  ) => {
    runTsButton.disabled = isRunning;
    runSqlButton.disabled = isRunning;
    resetButton.disabled = isRunning || editor.getValue() === example.code;
    runTsButton.textContent =
      isRunning && action === "generate" ? "Generating..." : "Generate SQL";
    runSqlButton.textContent =
      isRunning && action === "query" ? "Running..." : "Run query";
  };

  const runTs = async () => {
    if (executionInProgress) {
      return null;
    }
    executionInProgress = true;
    setExecutionState(true, "generate");
    try {
      return await generateSql();
    } finally {
      executionInProgress = false;
      setExecutionState(false, "generate");
    }
  };

  const runSql = async () => {
    if (executionInProgress) {
      return;
    }
    executionInProgress = true;
    setExecutionState(true, "query");
    runnerError.textContent = "";
    try {
      const sql = await generateSql();
      if (!sql) {
        runnerError.textContent = "No SQL available to run.";
        return;
      }
      const didRun = await runDuckDbQuery(sql, results, runnerError);
      if (didRun) {
        onCompleted();
      }
    } finally {
      executionInProgress = false;
      setExecutionState(false, "query");
    }
  };

  runTsButton.addEventListener(
    "click",
    () => {
      void runTs();
    },
    { signal: controller.signal },
  );
  runSqlButton.addEventListener(
    "click",
    () => {
      void runSql();
    },
    { signal: controller.signal },
  );
  resetButton.addEventListener(
    "click",
    () => {
      editor.setValue(example.code);
      tsError.textContent = "";
      runnerError.textContent = "";
      results.innerHTML = "";
      resetButton.disabled = true;
      void runTs();
    },
    { signal: controller.signal },
  );
  copySqlButton.addEventListener(
    "click",
    () => {
      if (!latestSql) {
        return;
      }
      void navigator.clipboard.writeText(latestSql).then(
        () => {
          copySqlButton.textContent = "Copied";
          copyResetTimeout = window.setTimeout(() => {
            copySqlButton.textContent = "Copy SQL";
          }, 1600);
        },
        () => {
          tsError.textContent = "Could not copy SQL to the clipboard.";
        },
      );
    },
    { signal: controller.signal },
  );
  editor.onDidChangeModelContent(() => {
    if (!executionInProgress) {
      resetButton.disabled = editor.getValue() === example.code;
    }
  });
  editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
    void runTs();
  });

  void generateSql();

  return () => {
    controller.abort();
    if (copyResetTimeout !== undefined) {
      window.clearTimeout(copyResetTimeout);
    }
    clearStatus();
    editor.dispose();
    editorModel.dispose();
    workerModel.dispose();
  };
}

async function init(monaco: MonacoModule) {
  const data = await loadTutorial();
  await configureMonaco(monaco);
  const headerStatus = document.getElementById("duckdb-status");
  if (headerStatus) {
    registerDuckDbStatus(headerStatus);
  }
  renderTutorial(data, monaco);

  try {
    duckdbHandle = await initDuckDb();
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    setDuckDbStatus(`DuckDB failed to load: ${message}`);
  }
}

const appWindow = window as AppWindow;
appWindow.App = { init };
