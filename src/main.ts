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
  dialect: "Postgresql";
  sections: Section[];
};

type AppHandle = {
  init: (monaco: MonacoModule) => Promise<void>;
};

type AppWindow = Window & { App?: AppHandle };

const DIALECT = "Postgresql" as const;
const DEFAULT_SNIPPET = `import { table, t } from "@teta/teta";

const users = table("users", {
  id: t.int(),
  name: t.string(),
});

const query = users.select((u) => ({
  id: u.id,
  name: u.name,
}));

query;`;

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

function renderTutorial(
  data: TutorialData,
  onLoadExample: (code: string) => void
) {
  const nav = document.getElementById("nav");
  const content = document.getElementById("content");

  if (!nav || !content) {
    return;
  }

  nav.innerHTML = "";
  content.innerHTML = "";

  for (const section of data.sections) {
    const link = document.createElement("a");
    link.href = `#${section.id}`;
    link.textContent = section.title;
    nav.appendChild(link);

    const sectionEl = document.createElement("section");
    sectionEl.className = "section";
    sectionEl.id = section.id;

    const heading = document.createElement("h2");
    heading.textContent = section.title;
    sectionEl.appendChild(heading);

    if (section.intro) {
      const intro = document.createElement("p");
      intro.textContent = section.intro;
      sectionEl.appendChild(intro);
    }

    if (section.examples.length === 0) {
      const placeholder = document.createElement("p");
      placeholder.textContent = "Examples coming soon.";
      sectionEl.appendChild(placeholder);
    }

    for (const example of section.examples) {
      const exampleEl = document.createElement("article");
      exampleEl.className = "example";

      const exampleTitle = document.createElement("h3");
      exampleTitle.textContent = example.title;
      exampleEl.appendChild(exampleTitle);

      const actions = document.createElement("div");
      actions.className = "example-actions";
      const runButton = document.createElement("button");
      runButton.type = "button";
      runButton.textContent = "Load in playground";
      runButton.addEventListener("click", () => onLoadExample(example.code));
      actions.appendChild(runButton);
      exampleEl.appendChild(actions);

      const grid = document.createElement("div");
      grid.className = "example-grid";

      const tsBlock = document.createElement("pre");
      tsBlock.className = "code-block";
      tsBlock.innerHTML = escapeHtml(example.code);

      const sqlBlock = document.createElement("pre");
      sqlBlock.className = "code-block";
      sqlBlock.innerHTML = escapeHtml(example.sql);

      grid.appendChild(tsBlock);
      grid.appendChild(sqlBlock);
      exampleEl.appendChild(grid);

      sectionEl.appendChild(exampleEl);
    }

    content.appendChild(sectionEl);
  }
}

function prepareUserCode(code: string) {
  let cleaned = code;

  cleaned = cleaned.replace(/^[\t ]*import[^;]*;?\n?/gm, "");
  cleaned = cleaned.replace(/^[\t ]*export\s+default\s+/gm, "const query = ");
  cleaned = cleaned.replace(/^[\t ]*export\s+const\s+query\s*=/gm, "const query =");
  cleaned = cleaned.replace(/^[\t ]*export\s+/gm, "");

  return cleaned;
}

function executeCode(compiled: string) {
  const runtimeGlobals = `const teta = __teta;\nconst { table, t, fn, windowFn, when, f, lit, currentDate, currentTimestamp, dateLiteral, timestampLiteral, loop } = __teta;`;

  const runner = new Function(
    "__teta",
    `"use strict";\n${runtimeGlobals}\n${compiled}\nreturn typeof query !== "undefined" ? query : undefined;`
  );

  const result = runner(Teta as unknown as Record<string, unknown>);

  if (!result) {
    throw new Error("No query was produced. Assign a Query to `query`.");
  }

  if (typeof (result as { toSql?: unknown }).toSql !== "function") {
    throw new Error("The value in `query` does not support toSql().");
  }

  return (result as { toSql: (dialect: string, format: string) => string }).toSql(
    DIALECT,
    "compact"
  );
}

async function setupPlayground(monaco: MonacoModule, data: TutorialData) {
  const editorEl = document.getElementById("editor");
  if (!editorEl) {
    throw new Error("Editor container not found.");
  }

  const tetaTypes = await fetch("./teta.d.ts").then((res) => res.text());
  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    tetaTypes,
    "file:///node_modules/@teta/teta/index.d.ts"
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

  const firstExample = data.sections.flatMap((section) => section.examples)[0];
  const initialCode = firstExample?.code ?? DEFAULT_SNIPPET;

  const editor = monaco.editor.create(editorEl, {
    value: initialCode,
    language: "typescript",
    theme: "vs",
    minimap: { enabled: false },
    fontSize: 13,
    scrollbar: { vertical: "auto" },
  });

  const workerModel = monaco.editor.createModel(
    "",
    "typescript",
    monaco.Uri.parse("inmemory://model/playground.ts")
  );

  const outputEl = document.getElementById("sql-output");
  const errorEl = document.getElementById("playground-error");
  const runButton = document.getElementById("run-button");

  const run = async () => {
    if (!outputEl || !errorEl) {
      return;
    }

    try {
      errorEl.textContent = "";
      const cleaned = prepareUserCode(editor.getValue());
      workerModel.setValue(cleaned);

      const worker = await monaco.languages.typescript.getTypeScriptWorker();
      const client = await worker(workerModel.uri);
      const emit = await client.getEmitOutput(workerModel.uri.toString());

      if (emit.emitSkipped) {
        throw new Error("TypeScript emit failed. Check the diagnostics.");
      }

      const jsOutput = emit.outputFiles.find((file) =>
        file.name.endsWith(".js")
      );

      if (!jsOutput) {
        throw new Error("No JavaScript output was generated.");
      }

      const sql = executeCode(jsOutput.text);
      outputEl.textContent = sql;
    } catch (err) {
      outputEl.textContent = "";
      errorEl.textContent = err instanceof Error ? err.message : String(err);
    }
  };

  runButton?.addEventListener("click", run);
  editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, run);
  run();

  return {
    editor,
    setCode: (code: string) => {
      editor.setValue(code);
      run();
    },
  };
}

async function init(monaco: MonacoModule) {
  const data = await loadTutorial();
  const playground = await setupPlayground(monaco, data);
  renderTutorial(data, (code) => playground.setCode(code));
}

const appWindow = window as AppWindow;
appWindow.App = { init };
