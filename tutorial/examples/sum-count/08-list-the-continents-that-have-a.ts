import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const world = table("world", {
  continent: t.string(),
  population: t.int(),
});

const query = world
  .aggregate((w) => ({
    continent: w.continent.group(),
    total_population: w.population.sum(),
  }))
  .filter((w) => w.total_population.gte(100000000))
  .select((w) => ({
    continent: w.continent,
  }));

query;`;

export const query = table("world", {
  continent: t.string(),
  population: t.int(),
})
  .aggregate((w) => ({
    continent: w.continent.group(),
    total_population: w.population.sum(),
  }))
  .filter((w) => w.total_population.gte(100000000))
  .select((w) => ({
    continent: w.continent,
  }));
