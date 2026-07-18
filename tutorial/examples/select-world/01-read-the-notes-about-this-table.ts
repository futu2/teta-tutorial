import { map, pipe, t, table } from "@teta/teta";
export const code = `import { map, pipe, t, table } from "@teta/teta";
const world = table("world", {
  name: t.string(),
  continent: t.string(),
  population: t.int(),
});
const query = pipe(
  world,
  map((w) => ({
    name: w.name,
    continent: w.continent,
    population: w.population,
  })),
);
query;`;
export const query = pipe(
  table("world", {
    name: t.string(),
    continent: t.string(),
    population: t.int(),
  }),
  map((w) => ({
    name: w.name,
    continent: w.continent,
    population: w.population,
  })),
);
