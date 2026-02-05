import { promises as fs } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import tutorial from "../tutorial/outline.ts";

const ROOT = process.cwd();
const OUTPUT_PATH = path.join(ROOT, "public", "tutorial.json");
const MONACO_SRC = path.join(ROOT, "node_modules", "monaco-editor", "min", "vs");
const MONACO_DEST = path.join(ROOT, "public", "monaco", "vs");
const DUCKDB_SRC = path.join(
  ROOT,
  "node_modules",
  "@duckdb",
  "duckdb-wasm",
  "dist"
);
const DUCKDB_DEST = path.join(ROOT, "public", "duckdb");
const TETA_TYPES_PATH = path.join(ROOT, "public", "teta.d.ts");

const TETA_TYPES = `declare module "@teta/teta" {
  export type Dialect = "Postgresql" | "Mysql" | "Sqlite" | "Mssql";
  export type SqlFormat = "compact" | "pretty";

  export interface Query<T = any> {
    select<U>(fn: (row: T) => U): Query<U>;
    where(fn: (row: T) => any): Query<T>;
    groupBy(fn: (row: T) => any): Query<T>;
    having(fn: (row: T) => any): Query<T>;
    orderBy(fn: (row: T) => any): Query<T>;
    limit(count: number): Query<T>;
    toSql(dialect?: Dialect, format?: SqlFormat): string;
  }

  export function table<T extends Record<string, any>>(
    name: string,
    shape?: T
  ): Query<T>;

  export const t: {
    int(): any;
    float(): any;
    string(): any;
    boolean(): any;
    date(): any;
    timestamp(): any;
  };

  export const fn: Record<string, (...args: any[]) => any>;
}
`;

type ExampleOutput = {
  id: string;
  title: string;
  code: string;
  sql: string;
};

type SectionOutput = {
  id: string;
  title: string;
  intro?: string;
  examples: ExampleOutput[];
};

type TutorialOutput = {
  title: string;
  dialect: "Postgresql";
  sections: SectionOutput[];
};

async function copyDir(src: string, dest: string) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

async function copyDirIfExists(src: string, dest: string, label: string) {
  try {
    const stats = await fs.stat(src);
    if (!stats.isDirectory()) {
      return;
    }
    await copyDir(src, dest);
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") {
      console.warn(`Skipping ${label} assets (missing ${src}).`);
      return;
    }
    throw err;
  }
}

async function buildTutorial() {
  const sections: SectionOutput[] = [];

  for (const section of tutorial.sections) {
    const examples: ExampleOutput[] = [];

    for (const example of section.examples) {
      const filePath = path.join(ROOT, example.file);
      const moduleUrl = pathToFileURL(filePath).href;
      const mod = await import(moduleUrl);

      if (!mod.code || !mod.query) {
        throw new Error(`Example ${example.file} must export code and query.`);
      }

      if (typeof mod.query.toSql !== "function") {
        throw new Error(`Example ${example.file} query does not support toSql.`);
      }

      const sql = mod.query.toSql(tutorial.dialect, "compact");

      examples.push({
        id: example.id,
        title: example.title,
        code: String(mod.code).trim(),
        sql,
      });
    }

    sections.push({
      id: section.id,
      title: section.title,
      intro: section.intro,
      examples,
    });
  }

  const output: TutorialOutput = {
    title: tutorial.title,
    dialect: tutorial.dialect,
    sections,
  };

  await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await fs.writeFile(OUTPUT_PATH, JSON.stringify(output, null, 2) + "\n");
  await fs.writeFile(TETA_TYPES_PATH, TETA_TYPES);
  await copyDir(MONACO_SRC, MONACO_DEST);
  await copyDirIfExists(DUCKDB_SRC, DUCKDB_DEST, "DuckDB");
}

await buildTutorial();
