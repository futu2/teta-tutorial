# teta-tutorial

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
