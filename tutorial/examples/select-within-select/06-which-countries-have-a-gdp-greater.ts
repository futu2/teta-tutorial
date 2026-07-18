import {
  and,
  dropOverlapRight,
  eq,
  filter,
  fold,
  gt,
  inner,
  isNotNull,
  join,
  lit,
  map,
  max,
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
  gt,
  inner,
  isNotNull,
  join,
  lit,
  map,
  max,
  pipe,
  t,
  table,
} from "@teta/teta";
const world = table("world", {
  name: t.string(),
  continent: t.string(),
  gdp: t.float(),
});
const europeMax = pipe(
  world,
  filter((w) => and(eq(w.continent, "Europe"), isNotNull(w.gdp))),
  fold((w) => ({
    max_gdp: max(w.gdp),
  })),
);
const query = pipe(
  world,
  join(
    europeMax,
    inner(() => lit(true), dropOverlapRight()),
  ),
  filter((w) => gt(w.gdp, w.max_gdp)),
  map((w) => ({
    name: w.name,
  })),
);
query;`;
const world = table("world", {
  name: t.string(),
  continent: t.string(),
  gdp: t.float(),
});
const europeMax = pipe(
  world,
  filter((w) => and(eq(w.continent, "Europe"), isNotNull(w.gdp))),
  fold((w) => ({
    max_gdp: max(w.gdp),
  })),
);
export const query = pipe(
  world,
  join(
    europeMax,
    inner(() => lit(true), dropOverlapRight()),
  ),
  filter((w) => gt(w.gdp, w.max_gdp)),
  map((w) => ({
    name: w.name,
  })),
);
