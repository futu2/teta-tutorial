import { fn, table, t } from "@teta/teta";

export const code = `import { fn, table, t } from "@teta/teta";

const world = table("world", {
  name: t.string(),
  population: t.int(),
  gdp: t.float(),
});

const query = world
  .filter((w) => w.gdp.gt(1000000000000))
  .select((w) => ({
    name: w.name,
    per_capita_gdp: fn("ROUND", w.gdp.div(w.population), -3),
  }));

query;`;

export const query = table("world", {
  name: t.string(),
  population: t.int(),
  gdp: t.float(),
})
  .filter((w) => w.gdp.gt(1000000000000))
  .select((w) => ({
    name: w.name,
    per_capita_gdp: fn("ROUND", w.gdp.div(w.population), -3),
  }));
