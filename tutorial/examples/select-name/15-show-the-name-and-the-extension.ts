import { concat, filter, like, map, pipe, replace, t, table } from "@teta/teta";
export const code = `import { concat, filter, like, map, pipe, replace, t, table } from "@teta/teta";
const world = table("world", {
  name: t.string(),
  capital: t.string(),
});
const query = pipe(
  world,
  filter((w) => like(w.capital, concat(w.name, "_%"))),
  map((w) => ({
    name: w.name,
    extension: replace(w.capital, w.name, ""),
  })),
);
query;`;
export const query = pipe(
  table("world", {
    name: t.string(),
    capital: t.string(),
  }),
  filter((w) => like(w.capital, concat(w.name, "_%"))),
  map((w) => ({
    name: w.name,
    extension: replace(w.capital, w.name, ""),
  })),
);
