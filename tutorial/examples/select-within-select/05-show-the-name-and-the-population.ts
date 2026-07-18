import {
  cast,
  concat,
  div,
  dropOverlapRight,
  eq,
  filter,
  inner,
  join,
  lit,
  map,
  mul,
  pipe,
  round,
  t,
  table,
} from "@teta/teta";
export const code = `import {
  cast,
  concat,
  div,
  dropOverlapRight,
  eq,
  filter,
  inner,
  join,
  lit,
  map,
  mul,
  pipe,
  round,
  t,
  table,
} from "@teta/teta";
const world = table("world", {
  name: t.string(),
  continent: t.string(),
  population: t.int(),
});
const germany = pipe(
  world,
  filter((w) => eq(w.name, "Germany")),
  map((w) => ({
    germany_population: w.population,
  })),
);
const query = pipe(
  world,
  join(
    germany,
    inner(() => lit(true), dropOverlapRight()),
  ),
  filter((w) => eq(w.continent, "Europe")),
  map((w) => ({
    name: w.name,
    population_percentage: concat(
      cast<string>(
        cast<number>(
          round(div(mul(w.population, 100), w.germany_population), 0),
          "INT",
        ),
        "TEXT",
      ),
      "%",
    ),
  })),
);
query;`;
const world = table("world", {
  name: t.string(),
  continent: t.string(),
  population: t.int(),
});
const germany = pipe(
  world,
  filter((w) => eq(w.name, "Germany")),
  map((w) => ({
    germany_population: w.population,
  })),
);
export const query = pipe(
  world,
  join(
    germany,
    inner(() => lit(true), dropOverlapRight()),
  ),
  filter((w) => eq(w.continent, "Europe")),
  map((w) => ({
    name: w.name,
    population_percentage: concat(
      cast<string>(
        cast<number>(
          round(div(mul(w.population, 100), w.germany_population), 0),
          "INT",
        ),
        "TEXT",
      ),
      "%",
    ),
  })),
);
