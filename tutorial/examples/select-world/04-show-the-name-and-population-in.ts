import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const world = table("world", {
  name: t.string(),
  continent: t.string(),
  population: t.int(),
});

const query = world
  .filter((w) => w.continent.eq("South America"))
  .select((w) => ({
    name: w.name,
    population_millions: w.population.div(1000000),
  }));

query;`;

export const query = table("world", {
  name: t.string(),
  continent: t.string(),
  population: t.int(),
})
  .filter((w) => w.continent.eq("South America"))
  .select((w) => ({
    name: w.name,
    population_millions: w.population.div(1000000),
  }));
