import {
  and,
  div,
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
  and,
  div,
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
  continent: t.string(),
  population: t.int(),
  gdp: t.float(),
});
const uk = pipe(
  world,
  filter((w) => eq(w.name, "United Kingdom")),
  map((w) => ({
    uk_per_capita: div(w.gdp, w.population),
  })),
);
const query = pipe(
  world,
  join(
    uk,
    inner(() => lit(true), dropOverlapRight()),
  ),
  filter((w) =>
    and(
      eq(w.continent, "Europe"),
      gt(div(w.gdp, w.population), w.uk_per_capita),
    ),
  ),
  map((w) => ({
    name: w.name,
  })),
);
query;`;
const world = table("world", {
  name: t.string(),
  continent: t.string(),
  population: t.int(),
  gdp: t.float(),
});
const uk = pipe(
  world,
  filter((w) => eq(w.name, "United Kingdom")),
  map((w) => ({
    uk_per_capita: div(w.gdp, w.population),
  })),
);
export const query = pipe(
  world,
  join(
    uk,
    inner(() => lit(true), dropOverlapRight()),
  ),
  filter((w) =>
    and(
      eq(w.continent, "Europe"),
      gt(div(w.gdp, w.population), w.uk_per_capita),
    ),
  ),
  map((w) => ({
    name: w.name,
  })),
);
