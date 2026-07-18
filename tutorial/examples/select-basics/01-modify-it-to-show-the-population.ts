import { eq, filter, map, pipe, t, table } from "@teta/teta";
export const code = `import { eq, filter, map, pipe, t, table } from "@teta/teta";
const world = table("world", {
  name: t.string(),
  population: t.int(),
});
const query = pipe(
  world,
  filter((w) => eq(w.name, "Germany")),
  map((w) => ({
    population: w.population,
  })),
);
query;`;
export const query = pipe(
  table("world", {
    name: t.string(),
    population: t.int(),
  }),
  filter((w) => eq(w.name, "Germany")),
  map((w) => ({
    population: w.population,
  })),
);
