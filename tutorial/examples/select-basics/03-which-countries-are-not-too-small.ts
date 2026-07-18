import { and, filter, gte, lte, map, pipe, t, table } from "@teta/teta";
export const code = `import { and, filter, gte, lte, map, pipe, t, table } from "@teta/teta";
const world = table("world", {
  name: t.string(),
  area: t.int(),
});
const query = pipe(
  world,
  filter((w) => and(gte(w.area, 200000), lte(w.area, 250000))),
  map((w) => ({
    name: w.name,
    area: w.area,
  })),
);
query;`;
export const query = pipe(
  table("world", {
    name: t.string(),
    area: t.int(),
  }),
  filter((w) => and(gte(w.area, 200000), lte(w.area, 250000))),
  map((w) => ({
    name: w.name,
    area: w.area,
  })),
);
