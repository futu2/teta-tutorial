import { fn, lit, table, t } from "@teta/teta";

export const code = `import { fn, lit, table, t } from "@teta/teta";

const world = table("world", {
  name: t.string(),
  continent: t.string(),
  population: t.int(),
});

const germany = world
  .filter((w) => w.name.eq("Germany"))
  .select((w) => ({
    germany_population: w.population,
  }));

const query = world
  .join(germany, () => lit(true))
  .filter((w) => w.continent.eq("Europe"))
  .select((w) => ({
    name: w.name,
    population_percentage: fn(
      "ROUND",
      w.population.mul(100).div(w.germany_population),
      0
    )
      .cast<number>("INT")
      .cast<string>("TEXT")
      .concat("%"),
  }));

query;`;

const world = table("world", {
  name: t.string(),
  continent: t.string(),
  population: t.int(),
});

const germany = world
  .filter((w) => w.name.eq("Germany"))
  .select((w) => ({
    germany_population: w.population,
  }));

export const query = world
  .join(germany, () => lit(true))
  .filter((w) => w.continent.eq("Europe"))
  .select((w) => ({
    name: w.name,
    population_percentage: fn(
      "ROUND",
      w.population.mul(100).div(w.germany_population),
      0
    )
      .cast<number>("INT")
      .cast<string>("TEXT")
      .concat("%"),
  }));
