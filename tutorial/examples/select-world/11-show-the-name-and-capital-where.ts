import { charLength, eq, filter, map, pipe, t, table } from "@teta/teta";
export const code = `import { charLength, eq, filter, map, pipe, t, table } from "@teta/teta";
const world = table("world", {
  name: t.string(),
  capital: t.string(),
});
const query = pipe(
  world,
  filter((w) => eq(charLength(w.name), charLength(w.capital))),
  map((w) => ({
    name: w.name,
    capital: w.capital,
  })),
);
query;`;
export const query = pipe(
  table("world", {
    name: t.string(),
    capital: t.string(),
  }),
  filter((w) => eq(charLength(w.name), charLength(w.capital))),
  map((w) => ({
    name: w.name,
    capital: w.capital,
  })),
);
