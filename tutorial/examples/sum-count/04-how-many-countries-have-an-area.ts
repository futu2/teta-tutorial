import { count, filter, fold, gte, pipe, t, table } from "@teta/teta";
export const code = `import { count, filter, fold, gte, pipe, t, table } from "@teta/teta";
const world = table("world", {
  name: t.string(),
  area: t.int(),
});
const query = pipe(
  world,
  filter((w) => gte(w.area, 1000000)),
  fold((w) => ({
    country_count: count(w.name),
  })),
);
query;`;
export const query = pipe(
  table("world", {
    name: t.string(),
    area: t.int(),
  }),
  filter((w) => gte(w.area, 1000000)),
  fold((w) => ({
    country_count: count(w.name),
  })),
);
