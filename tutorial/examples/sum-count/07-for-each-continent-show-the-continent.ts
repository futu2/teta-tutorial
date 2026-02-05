import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const world = table("world", {
  continent: t.string(),
  name: t.string(),
  population: t.int(),
});

const query = world
  .filter((w) => w.population.gte(10000000))
  .aggregate((w) => ({
    continent: w.continent.group(),
    country_count: w.name.count(),
  }));

query;`;

export const query = table("world", {
  continent: t.string(),
  name: t.string(),
  population: t.int(),
})
  .filter((w) => w.population.gte(10000000))
  .aggregate((w) => ({
    continent: w.continent.group(),
    country_count: w.name.count(),
  }));
