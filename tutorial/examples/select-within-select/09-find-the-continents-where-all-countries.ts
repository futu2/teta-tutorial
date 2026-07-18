import {
  dropOverlapRight,
  eq,
  filter,
  fold,
  group,
  gt,
  inner,
  join,
  lte,
  map,
  max,
  pipe,
  t,
  table,
} from "@teta/teta";
export const code = `import {
  dropOverlapRight,
  eq,
  filter,
  fold,
  group,
  gt,
  inner,
  join,
  lte,
  map,
  max,
  pipe,
  t,
  table,
} from "@teta/teta";
const world = table("world", {
  name: t.string(),
  continent: t.string(),
  population: t.int(),
});
const maxPopulation = pipe(
  world,
  filter((w) => gt(w.population, 0)),
  fold((w) => ({
    continent: group(w.continent),
    max_population: max(w.population),
  })),
  filter((c) => lte(c.max_population, 25000000)),
);
const query = pipe(
  world,
  join(
    maxPopulation,
    inner((w, c) => eq(w.continent, c.continent), dropOverlapRight()),
  ),
  map((w) => ({
    name: w.name,
    continent: w.continent,
    population: w.population,
  })),
);
query;`;
const world = table("world", {
  name: t.string(),
  continent: t.string(),
  population: t.int(),
});
const maxPopulation = pipe(
  world,
  filter((w) => gt(w.population, 0)),
  fold((w) => ({
    continent: group(w.continent),
    max_population: max(w.population),
  })),
  filter((c) => lte(c.max_population, 25000000)),
);
export const query = pipe(
  world,
  join(
    maxPopulation,
    inner((w, c) => eq(w.continent, c.continent), dropOverlapRight()),
  ),
  map((w) => ({
    name: w.name,
    continent: w.continent,
    population: w.population,
  })),
);
