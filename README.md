# Teta SQL EDSL Tutorial

This tutorial uses Teta `0.5.1`, the current function-first SQL EDSL for
TypeScript. Every exercise builds a typed query with `table(...)` and `pipe(...)`,
then renders it with `toSql(query, { dialect: "postgresql", format: "pretty" })`.
The examples follow the current Teta API: use `filter`, `map`, `fold`, `sort`,
and `join` as composable steps, and use standalone expression helpers such as
`eq`, `and`, `sum`, and `when`. Joins use Teta 0.5 specifications such as
`join(orders, left(on, select))`.

## Tutorial SPA

Install dependencies:

```bash
bun install
```

Build the tutorial JSON, copy Monaco + DuckDB assets, and bundle the app:

```bash
bun run build
```

Serve the static site:

```bash
bun run serve
```

Open `http://localhost:3000`.

## DuckDB datasets

The SQL runner loads CSVs from `public/data`. Placeholder `world.csv` and `nobel.csv`
are included; add the full SQL Zoo datasets to match the tutorial exactly.
