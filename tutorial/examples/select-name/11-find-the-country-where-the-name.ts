import { eq, filter, map, pipe, t, table } from "@teta/teta";
export const code = `import { eq, filter, map, pipe, t, table } from "@teta/teta";
const world = table("world", {
  name: t.string(),
  capital: t.string(),
});
const query = pipe(
  world,
  filter((w) => eq(w.name, w.capital)),
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
  filter((w) => eq(w.name, w.capital)),
  map((w) => ({
    name: w.name,
  })),
);
