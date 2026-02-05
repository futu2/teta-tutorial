import { lit, table, t } from "@teta/teta";

export const code = `import { lit, table, t } from "@teta/teta";

const world = table("world", {
  name: t.string(),
  population: t.int(),
});

const russia = world
  .filter((w) => w.name.eq("Russia"))
  .select((w) => ({
    russia_population: w.population,
  }));

const query = world
  .join(russia, () => lit(true))
  .filter((w) => w.population.gt(w.russia_population))
  .select((w) => ({
    name: w.name,
  }));

query;`;

const world = table("world", {
  name: t.string(),
  population: t.int(),
});

const russia = world
  .filter((w) => w.name.eq("Russia"))
  .select((w) => ({
    russia_population: w.population,
  }));

export const query = world
  .join(russia, () => lit(true))
  .filter((w) => w.population.gt(w.russia_population))
  .select((w) => ({
    name: w.name,
  }));
