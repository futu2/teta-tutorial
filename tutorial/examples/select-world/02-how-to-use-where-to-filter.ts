import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const world = table("world", {
  name: t.string(),
  population: t.int(),
});

const query = world
  .filter((w) => w.population.gt(200000000))
  .select((w) => ({
    name: w.name,
  }));

query;`;

export const query = table("world", {
  name: t.string(),
  population: t.int(),
})
  .filter((w) => w.population.gt(200000000))
  .select((w) => ({
    name: w.name,
  }));
