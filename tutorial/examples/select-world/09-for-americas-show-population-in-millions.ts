import { div, eq, filter, map, pipe, round, t, table } from "@teta/teta";
export const code = `import { div, eq, filter, map, pipe, round, t, table } from "@teta/teta";
const world = table("world", {
  name: t.string(),
  continent: t.string(),
  population: t.int(),
  gdp: t.float(),
});
const query = pipe(
  world,
  filter((w) => eq(w.continent, "South America")),
  map((w) => ({
    name: w.name,
    population_millions: round(div(w.population, 1000000.0), 2),
    gdp_billions: round(div(w.gdp, 1000000000.0), 2),
  })),
);
query;`;
export const query = pipe(
  table("world", {
    name: t.string(),
    continent: t.string(),
    population: t.int(),
    gdp: t.float(),
  }),
  filter((w) => eq(w.continent, "South America")),
  map((w) => ({
    name: w.name,
    population_millions: round(div(w.population, 1000000.0), 2),
    gdp_billions: round(div(w.gdp, 1000000000.0), 2),
  })),
);
