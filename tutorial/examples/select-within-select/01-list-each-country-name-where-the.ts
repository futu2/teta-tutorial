import {
  dropOverlapRight,
  eq,
  filter,
  gt,
  inner,
  join,
  lit,
  map,
  pipe,
  t,
  table,
} from "@teta/teta";
export const code = `import {
  dropOverlapRight,
  eq,
  filter,
  gt,
  inner,
  join,
  lit,
  map,
  pipe,
  t,
  table,
} from "@teta/teta";
const world = table("world", {
  name: t.string(),
  population: t.int(),
});
const russia = pipe(
  world,
  filter((w) => eq(w.name, "Russia")),
  map((w) => ({
    russia_population: w.population,
  })),
);
const query = pipe(
  world,
  join(
    russia,
    inner(() => lit(true), dropOverlapRight()),
  ),
  filter((w) => gt(w.population, w.russia_population)),
  map((w) => ({
    name: w.name,
  })),
);
query;`;
const world = table("world", {
  name: t.string(),
  population: t.int(),
});
const russia = pipe(
  world,
  filter((w) => eq(w.name, "Russia")),
  map((w) => ({
    russia_population: w.population,
  })),
);
export const query = pipe(
  world,
  join(
    russia,
    inner(() => lit(true), dropOverlapRight()),
  ),
  filter((w) => gt(w.population, w.russia_population)),
  map((w) => ({
    name: w.name,
  })),
);
