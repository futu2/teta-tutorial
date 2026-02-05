import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const world = table("world", {
  name: t.string(),
  population: t.int(),
  area: t.int(),
});

const query = world
  .filter((w) => {
    const bigPop = w.population.gt(250000000);
    const bigArea = w.area.gt(3000000);
    return bigPop.or(bigArea).and(bigPop.and(bigArea).not());
  })
  .select((w) => ({
    name: w.name,
    population: w.population,
    area: w.area,
  }));

query;`;

export const query = table("world", {
  name: t.string(),
  population: t.int(),
  area: t.int(),
})
  .filter((w) => {
    const bigPop = w.population.gt(250000000);
    const bigArea = w.area.gt(3000000);
    return bigPop.or(bigArea).and(bigPop.and(bigArea).not());
  })
  .select((w) => ({
    name: w.name,
    population: w.population,
    area: w.area,
  }));
