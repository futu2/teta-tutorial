import { eq, filter, map, or, pipe, t, table } from "@teta/teta";
export const code = `import { eq, filter, map, or, pipe, t, table } from "@teta/teta";
const world = table("world", {
  name: t.string(),
  population: t.int(),
});
const query = pipe(
  world,
  filter((w) =>
    or(or(eq(w.name, "France"), eq(w.name, "Germany")), eq(w.name, "Italy")),
  ),
  map((w) => ({
    name: w.name,
    population: w.population,
  })),
);
query;`;
export const query = pipe(
  table("world", {
    name: t.string(),
    population: t.int(),
  }),
  filter((w) =>
    or(or(eq(w.name, "France"), eq(w.name, "Germany")), eq(w.name, "Italy")),
  ),
  map((w) => ({
    name: w.name,
    population: w.population,
  })),
);
