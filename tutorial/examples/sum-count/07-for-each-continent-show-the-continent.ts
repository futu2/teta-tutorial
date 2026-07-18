import { count, filter, fold, group, gte, pipe, t, table } from "@teta/teta";
export const code = `import { count, filter, fold, group, gte, pipe, t, table } from "@teta/teta";
const world = table("world", {
  continent: t.string(),
  name: t.string(),
  population: t.int(),
});
const query = pipe(
  world,
  filter((w) => gte(w.population, 10000000)),
  fold((w) => ({
    continent: group(w.continent),
    country_count: count(w.name),
  })),
);
query;`;
export const query = pipe(
  table("world", {
    continent: t.string(),
    name: t.string(),
    population: t.int(),
  }),
  filter((w) => gte(w.population, 10000000)),
  fold((w) => ({
    continent: group(w.continent),
    country_count: count(w.name),
  })),
);
