import { lit, table, t } from "@teta/teta";

export const code = `import { lit, table, t } from "@teta/teta";

const world = table("world", {
  name: t.string(),
  population: t.int(),
});

const uk = world
  .filter((w) => w.name.eq("United Kingdom"))
  .select((w) => ({
    uk_min_population: w.population.add(1),
  }));

const germany = world
  .filter((w) => w.name.eq("Germany"))
  .select((w) => ({
    germany_max_population: w.population.sub(1),
  }));

const query = world
  .join(uk, () => lit(true))
  .join(germany, () => lit(true))
  .filter((w) =>
    w
      .population.gte(w.uk_min_population)
      .and(w.population.lte(w.germany_max_population))
  )
  .select((w) => ({
    name: w.name,
    population: w.population,
  }));

query;`;

const world = table("world", {
  name: t.string(),
  population: t.int(),
});

const uk = world
  .filter((w) => w.name.eq("United Kingdom"))
  .select((w) => ({
    uk_min_population: w.population.add(1),
  }));

const germany = world
  .filter((w) => w.name.eq("Germany"))
  .select((w) => ({
    germany_max_population: w.population.sub(1),
  }));

export const query = world
  .join(uk, () => lit(true))
  .join(germany, () => lit(true))
  .filter((w) =>
    w
      .population.gte(w.uk_min_population)
      .and(w.population.lte(w.germany_max_population))
  )
  .select((w) => ({
    name: w.name,
    population: w.population,
  }));
