import {
  and,
  dropOverlapRight,
  eq,
  filter,
  fold,
  group,
  gt,
  inner,
  join,
  map,
  max,
  mul,
  ne,
  pipe,
  t,
  table,
} from "@teta/teta";
export const code = `import {
  and,
  dropOverlapRight,
  eq,
  filter,
  fold,
  group,
  gt,
  inner,
  join,
  map,
  max,
  mul,
  ne,
  pipe,
  t,
  table,
} from "@teta/teta";
const world = table("world", {
  name: t.string(),
  continent: t.string(),
  population: t.int(),
});
const other = pipe(
  world,
  map((w) => ({
    other_name: w.name,
    other_continent: w.continent,
    other_population: w.population,
  })),
);
const maxOther = pipe(
  world,
  join(
    other,
    inner(
      (w, o) =>
        and(eq(w.continent, o.other_continent), ne(w.name, o.other_name)),
      dropOverlapRight(),
    ),
  ),
  fold((w) => ({
    name: group(w.name),
    continent: group(w.continent),
    population: group(w.population),
    max_other_population: max(w.other_population),
  })),
);
const query = pipe(
  maxOther,
  filter((w) => gt(w.population, mul(w.max_other_population, 3))),
  map((w) => ({
    name: w.name,
    continent: w.continent,
  })),
);
query;`;
const world = table("world", {
  name: t.string(),
  continent: t.string(),
  population: t.int(),
});
const other = pipe(
  world,
  map((w) => ({
    other_name: w.name,
    other_continent: w.continent,
    other_population: w.population,
  })),
);
const maxOther = pipe(
  world,
  join(
    other,
    inner(
      (w, o) =>
        and(eq(w.continent, o.other_continent), ne(w.name, o.other_name)),
      dropOverlapRight(),
    ),
  ),
  fold((w) => ({
    name: group(w.name),
    continent: group(w.continent),
    population: group(w.population),
    max_other_population: max(w.other_population),
  })),
);
export const query = pipe(
  maxOther,
  filter((w) => gt(w.population, mul(w.max_other_population, 3))),
  map((w) => ({
    name: w.name,
    continent: w.continent,
  })),
);
