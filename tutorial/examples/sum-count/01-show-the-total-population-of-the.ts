import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const world = table("world", {
  population: t.int(),
});

const query = world.aggregate((w) => ({
  total_population: w.population.sum(),
}));

query;`;

export const query = table("world", {
  population: t.int(),
}).aggregate((w) => ({
  total_population: w.population.sum(),
}));
