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
  pipe,
  t,
  table,
} from "@teta/teta";
const world = table("world", {
  name: t.string(),
  continent: t.string(),
  area: t.int(),
});
const maxArea = pipe(
  world,
  filter((w) => gt(w.area, 0)),
  fold((w) => ({
    continent: group(w.continent),
    max_area: max(w.area),
  })),
);
const query = pipe(
  world,
  join(
    maxArea,
    inner(
      (w, m) => and(eq(w.continent, m.continent), eq(w.area, m.max_area)),
      dropOverlapRight(),
    ),
  ),
  map((w) => ({
    continent: w.continent,
    name: w.name,
    area: w.area,
  })),
);
query;`;
const world = table("world", {
  name: t.string(),
  continent: t.string(),
  area: t.int(),
});
const maxArea = pipe(
  world,
  filter((w) => gt(w.area, 0)),
  fold((w) => ({
    continent: group(w.continent),
    max_area: max(w.area),
  })),
);
export const query = pipe(
  world,
  join(
    maxArea,
    inner(
      (w, m) => and(eq(w.continent, m.continent), eq(w.area, m.max_area)),
      dropOverlapRight(),
    ),
  ),
  map((w) => ({
    continent: w.continent,
    name: w.name,
    area: w.area,
  })),
);
