import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const world = table("world", {
  name: t.string(),
  population: t.int(),
  gdp: t.float(),
});

const query = world
  .filter((w) => w.population.gt(200000000))
  .select((w) => ({
    name: w.name,
    per_capita_gdp: w.gdp.div(w.population),
  }));

query;`;

export const query = table("world", {
  name: t.string(),
  population: t.int(),
  gdp: t.float(),
})
  .filter((w) => w.population.gt(200000000))
  .select((w) => ({
    name: w.name,
    per_capita_gdp: w.gdp.div(w.population),
  }));
