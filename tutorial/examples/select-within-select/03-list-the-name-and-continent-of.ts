import {
  asc,
  dropOverlapRight,
  eq,
  filter,
  fold,
  group,
  inner,
  join,
  map,
  or,
  pipe,
  sort,
  t,
  table,
} from "@teta/teta";
export const code = `import {
  asc,
  dropOverlapRight,
  eq,
  filter,
  fold,
  group,
  inner,
  join,
  map,
  or,
  pipe,
  sort,
  t,
  table,
} from "@teta/teta";
const world = table("world", {
  name: t.string(),
  continent: t.string(),
});
const targetContinents = pipe(
  world,
  filter((w) => or(eq(w.name, "Australia"), eq(w.name, "Argentina"))),
  fold((w) => ({
    continent: group(w.continent),
  })),
);
const query = pipe(
  world,
  join(
    targetContinents,
    inner((w, c) => eq(w.continent, c.continent), dropOverlapRight()),
  ),
  map((w) => ({
    name: w.name,
    continent: w.continent,
  })),
  sort((w) => asc(w.name)),
);
query;`;
const world = table("world", {
  name: t.string(),
  continent: t.string(),
});
const targetContinents = pipe(
  world,
  filter((w) => or(eq(w.name, "Australia"), eq(w.name, "Argentina"))),
  fold((w) => ({
    continent: group(w.continent),
  })),
);
export const query = pipe(
  world,
  join(
    targetContinents,
    inner((w, c) => eq(w.continent, c.continent), dropOverlapRight()),
  ),
  map((w) => ({
    name: w.name,
    continent: w.continent,
  })),
  sort((w) => asc(w.name)),
);
