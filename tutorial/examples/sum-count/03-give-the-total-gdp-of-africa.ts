import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const world = table("world", {
  continent: t.string(),
  gdp: t.float(),
});

const query = world
  .filter((w) => w.continent.eq("Africa"))
  .aggregate((w) => ({
    total_gdp: w.gdp.sum(),
  }));

query;`;

export const query = table("world", {
  continent: t.string(),
  gdp: t.float(),
})
  .filter((w) => w.continent.eq("Africa"))
  .aggregate((w) => ({
    total_gdp: w.gdp.sum(),
  }));
