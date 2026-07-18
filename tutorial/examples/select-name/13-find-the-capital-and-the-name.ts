import { concat, filter, like, map, pipe, t, table } from "@teta/teta";
export const code = `import { concat, filter, like, map, pipe, t, table } from "@teta/teta";
const world = table("world", {
  name: t.string(),
  capital: t.string(),
});
const query = pipe(
  world,
  filter((w) => like(w.capital, concat("%", w.name, "%"))),
  map((w) => ({
    capital: w.capital,
    name: w.name,
  })),
);
query;`;
export const query = pipe(
  table("world", {
    name: t.string(),
    capital: t.string(),
  }),
  filter((w) => like(w.capital, concat("%", w.name, "%"))),
  map((w) => ({
    capital: w.capital,
    name: w.name,
  })),
);
