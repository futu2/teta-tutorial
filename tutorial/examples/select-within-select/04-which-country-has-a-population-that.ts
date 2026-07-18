import {
  add,
  and,
  dropOverlapRight,
  eq,
  filter,
  gte,
  inner,
  join,
  lit,
  lte,
  map,
  pipe,
  sub,
  t,
  table,
} from "@teta/teta";
export const code = `import {
  add,
  and,
  dropOverlapRight,
  eq,
  filter,
  gte,
  inner,
  join,
  lit,
  lte,
  map,
  pipe,
  sub,
  t,
  table,
} from "@teta/teta";
const world = table("world", {
  name: t.string(),
  population: t.int(),
});
const uk = pipe(
  world,
  filter((w) => eq(w.name, "United Kingdom")),
  map((w) => ({
    uk_min_population: add(w.population, 1),
  })),
);
const germany = pipe(
  world,
  filter((w) => eq(w.name, "Germany")),
  map((w) => ({
    germany_max_population: sub(w.population, 1),
  })),
);
const query = pipe(
  world,
  join(
    uk,
    inner(() => lit(true), dropOverlapRight()),
  ),
  join(
    germany,
    inner(() => lit(true), dropOverlapRight()),
  ),
  filter((w) =>
    and(
      gte(w.population, w.uk_min_population),
      lte(w.population, w.germany_max_population),
    ),
  ),
  map((w) => ({
    name: w.name,
    population: w.population,
  })),
);
query;`;
const world = table("world", {
  name: t.string(),
  population: t.int(),
});
const uk = pipe(
  world,
  filter((w) => eq(w.name, "United Kingdom")),
  map((w) => ({
    uk_min_population: add(w.population, 1),
  })),
);
const germany = pipe(
  world,
  filter((w) => eq(w.name, "Germany")),
  map((w) => ({
    germany_max_population: sub(w.population, 1),
  })),
);
export const query = pipe(
  world,
  join(
    uk,
    inner(() => lit(true), dropOverlapRight()),
  ),
  join(
    germany,
    inner(() => lit(true), dropOverlapRight()),
  ),
  filter((w) =>
    and(
      gte(w.population, w.uk_min_population),
      lte(w.population, w.germany_max_population),
    ),
  ),
  map((w) => ({
    name: w.name,
    population: w.population,
  })),
);
