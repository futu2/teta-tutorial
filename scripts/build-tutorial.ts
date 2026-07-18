import { promises as fs } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { toSql } from "@teta/teta";
import tutorial from "../tutorial/outline.ts";

const ROOT = process.cwd();
const OUTPUT_PATH = path.join(ROOT, "public", "tutorial.json");
const STATIC_SRC = path.join(ROOT, "static");
const STATIC_DEST = path.join(ROOT, "public");
const MONACO_SRC = path.join(
  ROOT,
  "node_modules",
  "monaco-editor",
  "min",
  "vs",
);
const MONACO_DEST = path.join(ROOT, "public", "monaco", "vs");
const DUCKDB_SRC = path.join(
  ROOT,
  "node_modules",
  "@duckdb",
  "duckdb-wasm",
  "dist",
);
const DUCKDB_DEST = path.join(ROOT, "public", "duckdb");
const TETA_TYPES_PATH = path.join(ROOT, "public", "teta.d.ts");

const TETA_TYPES = `declare module "@teta/teta" {
  export type Dialect = "postgresql" | "mysql" | "sqlite" | "mssql";
  export type SqlFormat = "compact" | "pretty";
  export type Expr<T = any> = any;
  export type QueryColumns = Record<string, any>;
  export type Query<T extends QueryColumns = QueryColumns> = { columns: T };
  export type QueryStep<T extends QueryColumns = QueryColumns, U extends QueryColumns = T> = (query: Query<T>) => Query<U>;
  export type ColumnRefs<T extends QueryColumns = QueryColumns> = T;

  export function table<T extends QueryColumns>(name: string, shape: Record<string, any>): Query<T>;
  export const t: {
    int(): any; float(): any; string(): any; boolean(): any; date(): any; timestamp(): any;
  };
  export function pipe<T extends QueryColumns>(query: Query<T>, ...steps: Array<QueryStep<any, any>>): Query<any>;
  export function map<T extends QueryColumns>(selector: (row: ColumnRefs<T>) => Record<string, any>): QueryStep<T, QueryColumns>;
  export function fold<T extends QueryColumns>(selector: (row: ColumnRefs<T>) => Record<string, any>): QueryStep<T, QueryColumns>;
  export function filter<T extends QueryColumns>(predicate: (row: ColumnRefs<T>) => any): QueryStep<T, T>;
  export function sort<T extends QueryColumns>(selector: (row: ColumnRefs<T>) => any): QueryStep<T, T>;
  export type JoinSpec = { type: "inner" | "left" | "right" | "full"; on: (left: any, right: any) => any; select?: any };
  export function inner(on: (left: any, right: any) => any, select?: any): JoinSpec;
  export function left(on: (left: any, right: any) => any, select?: any): JoinSpec;
  export function right(on: (left: any, right: any) => any, select?: any): JoinSpec;
  export function full(on: (left: any, right: any) => any, select?: any): JoinSpec;
  export function join(right: Query<any>, spec: JoinSpec): QueryStep<any, any>;
  export function dropOverlapRight(): any;

  export function eq(left: any, right: any): Expr;
  export function ne(left: any, right: any): Expr;
  export function gt(left: any, right: any): Expr;
  export function gte(left: any, right: any): Expr;
  export function lt(left: any, right: any): Expr;
  export function lte(left: any, right: any): Expr;
  export function like(left: any, right: any): Expr;
  export function and(...values: any[]): Expr;
  export function or(...values: any[]): Expr;
  export function not(value: any): Expr;
  export function isNull(value: any): Expr;
  export function isNotNull(value: any): Expr;
  export function add(left: any, right: any): Expr;
  export function sub(left: any, right: any): Expr;
  export function mul(left: any, right: any): Expr;
  export function div(left: any, right: any): Expr;
  export function group(value: any): Expr;
  export function count(value: any): Expr;
  export function sum(value: any): Expr;
  export function min(value: any): Expr;
  export function max(value: any): Expr;
  export function asc(value: any): any;
  export function desc(value: any): any;
  export function concat(value: any, ...parts: any[]): Expr;
  export function replace(value: any, search: any, replacement: any): Expr;
  export function substring(value: any, start: any, length?: any): Expr;
  export function charLength(value: any): Expr;
  export function coalesce(value: any, ...fallbacks: any[]): Expr;
  export function cast<T = unknown>(value: any, target: string): Expr<T>;
  export function round(value: any, scale?: any): Expr;
  export function when(...args: any[]): Expr;
  export function lit<T>(value: T): Expr<T>;
  export function toSql(query: Query<any>, options: { dialect: Dialect; format?: SqlFormat }): string;
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
  dialect: "postgresql";
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

      const sql = toSql(mod.query, {
        dialect: tutorial.dialect,
        format: "pretty",
      });

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

  await copyDirIfExists(STATIC_SRC, STATIC_DEST, "static");
  await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await fs.writeFile(OUTPUT_PATH, JSON.stringify(output, null, 2) + "\n");
  await fs.writeFile(TETA_TYPES_PATH, TETA_TYPES);
  await copyDir(MONACO_SRC, MONACO_DEST);
  await copyDirIfExists(DUCKDB_SRC, DUCKDB_DEST, "DuckDB");
}

await buildTutorial();
