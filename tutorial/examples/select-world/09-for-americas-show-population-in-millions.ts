import { fn, table, t } from "@teta/teta";

export const code = `import { fn, table, t } from "@teta/teta";

const world = table("world", {
  name: t.string(),
  continent: t.string(),
  population: t.int(),
  gdp: t.float(),
});

const query = world
  .filter((w) => w.continent.eq("South America"))
  .select((w) => ({
    name: w.name,
    population_millions: fn("ROUND", w.population.div(1000000.0), 2),
    gdp_billions: fn("ROUND", w.gdp.div(1000000000.0), 2),
  }));

query;`;

export const query = table("world", {
  name: t.string(),
  continent: t.string(),
  population: t.int(),
  gdp: t.float(),
})
  .filter((w) => w.continent.eq("South America"))
  .select((w) => ({
    name: w.name,
    population_millions: fn("ROUND", w.population.div(1000000.0), 2),
    gdp_billions: fn("ROUND", w.gdp.div(1000000000.0), 2),
  }));
