import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const world = table("world", {
  name: t.string(),
  continent: t.string(),
  population: t.int(),
});

const maxPopulation = world
  .filter((w) => w.population.gt(0))
  .aggregate((w) => ({
    continent: w.continent.group(),
    max_population: w.population.max(),
  }))
  .filter((c) => c.max_population.lte(25000000));

const query = world
  .join(maxPopulation, (w, c) => w.continent.eq(c.continent))
  .select((w) => ({
    name: w.name,
    continent: w.continent,
    population: w.population,
  }));

query;`;

const world = table("world", {
  name: t.string(),
  continent: t.string(),
  population: t.int(),
});

const maxPopulation = world
  .filter((w) => w.population.gt(0))
  .aggregate((w) => ({
    continent: w.continent.group(),
    max_population: w.population.max(),
  }))
  .filter((c) => c.max_population.lte(25000000));

export const query = world
  .join(maxPopulation, (w, c) => w.continent.eq(c.continent))
  .select((w) => ({
    name: w.name,
    continent: w.continent,
    population: w.population,
  }));
