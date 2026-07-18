import {
  and,
  dropOverlapRight,
  eq,
  fold,
  group,
  inner,
  join,
  map,
  min,
  pipe,
  t,
  table,
} from "@teta/teta";
export const code = `import {
  and,
  dropOverlapRight,
  eq,
  fold,
  group,
  inner,
  join,
  map,
  min,
  pipe,
  t,
  table,
} from "@teta/teta";
const world = table("world", {
  name: t.string(),
  continent: t.string(),
});
const minName = pipe(
  world,
  fold((w) => ({
    continent: group(w.continent),
    first_name: min(w.name),
  })),
);
const query = pipe(
  world,
  join(
    minName,
    inner(
      (w, m) => and(eq(w.continent, m.continent), eq(w.name, m.first_name)),
      dropOverlapRight(),
    ),
  ),
  map((w) => ({
    continent: w.continent,
    name: w.name,
  })),
);
query;`;
const world = table("world", {
  name: t.string(),
  continent: t.string(),
});
const minName = pipe(
  world,
  fold((w) => ({
    continent: group(w.continent),
    first_name: min(w.name),
  })),
);
export const query = pipe(
  world,
  join(
    minName,
    inner(
      (w, m) => and(eq(w.continent, m.continent), eq(w.name, m.first_name)),
      dropOverlapRight(),
    ),
  ),
  map((w) => ({
    continent: w.continent,
    name: w.name,
  })),
);
