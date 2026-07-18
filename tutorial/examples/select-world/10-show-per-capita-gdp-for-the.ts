import { div, filter, gt, map, pipe, round, t, table } from "@teta/teta";
export const code = `import { div, filter, gt, map, pipe, round, t, table } from "@teta/teta";
const world = table("world", {
  name: t.string(),
  population: t.int(),
  gdp: t.float(),
});
const query = pipe(
  world,
  filter((w) => gt(w.gdp, 1000000000000)),
  map((w) => ({
    name: w.name,
    per_capita_gdp: round(div(w.gdp, w.population), -3),
  })),
);
query;`;
export const query = pipe(
  table("world", {
    name: t.string(),
    population: t.int(),
    gdp: t.float(),
  }),
  filter((w) => gt(w.gdp, 1000000000000)),
  map((w) => ({
    name: w.name,
    per_capita_gdp: round(div(w.gdp, w.population), -3),
  })),
);
