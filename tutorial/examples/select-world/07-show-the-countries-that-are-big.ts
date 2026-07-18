import { filter, gt, map, or, pipe, t, table } from "@teta/teta";
export const code = `import { filter, gt, map, or, pipe, t, table } from "@teta/teta";
const world = table("world", {
  name: t.string(),
  population: t.int(),
  area: t.int(),
});
const query = pipe(
  world,
  filter((w) => or(gt(w.area, 3000000), gt(w.population, 250000000))),
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
  filter((w) => or(gt(w.area, 3000000), gt(w.population, 250000000))),
  map((w) => ({
    name: w.name,
    population: w.population,
    area: w.area,
  })),
);
