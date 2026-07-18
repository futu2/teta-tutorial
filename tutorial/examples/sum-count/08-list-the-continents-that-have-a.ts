import { filter, fold, group, gte, map, pipe, sum, t, table } from "@teta/teta";
export const code = `import { filter, fold, group, gte, map, pipe, sum, t, table } from "@teta/teta";
const world = table("world", {
  continent: t.string(),
  population: t.int(),
});
const query = pipe(
  world,
  fold((w) => ({
    continent: group(w.continent),
    total_population: sum(w.population),
  })),
  filter((w) => gte(w.total_population, 100000000)),
  map((w) => ({
    continent: w.continent,
  })),
);
query;`;
export const query = pipe(
  table("world", {
    continent: t.string(),
    population: t.int(),
  }),
  fold((w) => ({
    continent: group(w.continent),
    total_population: sum(w.population),
  })),
  filter((w) => gte(w.total_population, 100000000)),
  map((w) => ({
    continent: w.continent,
  })),
);
