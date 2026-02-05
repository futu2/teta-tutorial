import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const world = table("world", {
  name: t.string(),
  continent: t.string(),
  population: t.int(),
});

const query = world.select((w) => ({
  name: w.name,
  continent: w.continent,
  population: w.population,
}));

query;`;

export const query = table("world", {
  name: t.string(),
  continent: t.string(),
  population: t.int(),
}).select((w) => ({
  name: w.name,
  continent: w.continent,
  population: w.population,
}));
