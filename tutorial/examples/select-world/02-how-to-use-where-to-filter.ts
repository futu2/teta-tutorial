import { filter, gt, map, pipe, t, table } from "@teta/teta";
export const code = `import { filter, gt, map, pipe, t, table } from "@teta/teta";
const world = table("world", {
  name: t.string(),
  population: t.int(),
});
const query = pipe(
  world,
  filter((w) => gt(w.population, 200000000)),
  map((w) => ({
    name: w.name,
  })),
);
query;`;
export const query = pipe(
  table("world", {
    name: t.string(),
    population: t.int(),
  }),
  filter((w) => gt(w.population, 200000000)),
  map((w) => ({
    name: w.name,
  })),
);
