import { div, filter, gt, map, pipe, t, table } from "@teta/teta";
export const code = `import { div, filter, gt, map, pipe, t, table } from "@teta/teta";
const world = table("world", {
  name: t.string(),
  population: t.int(),
  gdp: t.float(),
});
const query = pipe(
  world,
  filter((w) => gt(w.population, 200000000)),
  map((w) => ({
    name: w.name,
    per_capita_gdp: div(w.gdp, w.population),
  })),
);
query;`;
export const query = pipe(
  table("world", {
    name: t.string(),
    population: t.int(),
    gdp: t.float(),
  }),
  filter((w) => gt(w.population, 200000000)),
  map((w) => ({
    name: w.name,
    per_capita_gdp: div(w.gdp, w.population),
  })),
);
