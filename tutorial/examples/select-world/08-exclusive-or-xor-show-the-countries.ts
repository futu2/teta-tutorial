import { and, filter, gt, map, not, or, pipe, t, table } from "@teta/teta";
export const code = `import { and, filter, gt, map, not, or, pipe, t, table } from "@teta/teta";
const world = table("world", {
  name: t.string(),
  population: t.int(),
  area: t.int(),
});
const query = pipe(
  world,
  filter((w) => {
    const bigPop = gt(w.population, 250000000);
    const bigArea = gt(w.area, 3000000);
    return and(or(bigPop, bigArea), not(and(bigPop, bigArea)));
  }),
  map((w) => ({
    name: w.name,
    population: w.population,
    area: w.area,
  })),
);
query;`;
export const query = pipe(
  table("world", {
    name: t.string(),
    population: t.int(),
    area: t.int(),
  }),
  filter((w) => {
    const bigPop = gt(w.population, 250000000);
    const bigArea = gt(w.area, 3000000);
    return and(or(bigPop, bigArea), not(and(bigPop, bigArea)));
  }),
  map((w) => ({
    name: w.name,
    population: w.population,
    area: w.area,
  })),
);
