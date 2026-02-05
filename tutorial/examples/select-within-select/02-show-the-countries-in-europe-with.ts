import { lit, table, t } from "@teta/teta";

export const code = `import { lit, table, t } from "@teta/teta";

const world = table("world", {
  name: t.string(),
  continent: t.string(),
  population: t.int(),
  gdp: t.float(),
});

const uk = world
  .filter((w) => w.name.eq("United Kingdom"))
  .select((w) => ({
    uk_per_capita: w.gdp.div(w.population),
  }));

const query = world
  .join(uk, () => lit(true))
  .filter((w) =>
    w
      .continent.eq("Europe")
      .and(w.gdp.div(w.population).gt(w.uk_per_capita))
  )
  .select((w) => ({
    name: w.name,
  }));

query;`;

const world = table("world", {
  name: t.string(),
  continent: t.string(),
  population: t.int(),
  gdp: t.float(),
});

const uk = world
  .filter((w) => w.name.eq("United Kingdom"))
  .select((w) => ({
    uk_per_capita: w.gdp.div(w.population),
  }));

export const query = world
  .join(uk, () => lit(true))
  .filter((w) =>
    w
      .continent.eq("Europe")
      .and(w.gdp.div(w.population).gt(w.uk_per_capita))
  )
  .select((w) => ({
    name: w.name,
  }));
