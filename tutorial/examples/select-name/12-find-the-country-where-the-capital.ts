import { concat, eq, filter, map, pipe, t, table } from "@teta/teta";
export const code = `import { concat, eq, filter, map, pipe, t, table } from "@teta/teta";
const world = table("world", {
  name: t.string(),
  capital: t.string(),
});
const query = pipe(
  world,
  filter((w) => eq(w.capital, concat(w.name, " City"))),
  map((w) => ({
    name: w.name,
  })),
);
query;`;
export const query = pipe(
  table("world", {
    name: t.string(),
    capital: t.string(),
  }),
  filter((w) => eq(w.capital, concat(w.name, " City"))),
  map((w) => ({
    name: w.name,
  })),
);
