import { div, eq, filter, map, pipe, t, table } from "@teta/teta";
export const code = `import { div, eq, filter, map, pipe, t, table } from "@teta/teta";
const world = table("world", {
  name: t.string(),
  continent: t.string(),
  population: t.int(),
});
const query = pipe(
  world,
  filter((w) => eq(w.continent, "South America")),
  map((w) => ({
    name: w.name,
    population_millions: div(w.population, 1000000),
  })),
);
query;`;
export const query = pipe(
  table("world", {
    name: t.string(),
    continent: t.string(),
    population: t.int(),
  }),
  filter((w) => eq(w.continent, "South America")),
  map((w) => ({
    name: w.name,
    population_millions: div(w.population, 1000000),
  })),
);
