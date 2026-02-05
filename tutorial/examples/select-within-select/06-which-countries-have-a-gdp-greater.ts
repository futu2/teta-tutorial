import { lit, table, t } from "@teta/teta";

export const code = `import { lit, table, t } from "@teta/teta";

const world = table("world", {
  name: t.string(),
  continent: t.string(),
  gdp: t.float(),
});

const europeMax = world
  .filter((w) => w.continent.eq("Europe").and(w.gdp.isNotNull()))
  .aggregate((w) => ({
    max_gdp: w.gdp.max(),
  }));

const query = world
  .join(europeMax, () => lit(true))
  .filter((w) => w.gdp.gt(w.max_gdp))
  .select((w) => ({
    name: w.name,
  }));

query;`;

const world = table("world", {
  name: t.string(),
  continent: t.string(),
  gdp: t.float(),
});

const europeMax = world
  .filter((w) => w.continent.eq("Europe").and(w.gdp.isNotNull()))
  .aggregate((w) => ({
    max_gdp: w.gdp.max(),
  }));

export const query = world
  .join(europeMax, () => lit(true))
  .filter((w) => w.gdp.gt(w.max_gdp))
  .select((w) => ({
    name: w.name,
  }));
