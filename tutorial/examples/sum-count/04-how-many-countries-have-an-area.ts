import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const world = table("world", {
  name: t.string(),
  area: t.int(),
});

const query = world
  .filter((w) => w.area.gte(1000000))
  .aggregate((w) => ({
    country_count: w.name.count(),
  }));

query;`;

export const query = table("world", {
  name: t.string(),
  area: t.int(),
})
  .filter((w) => w.area.gte(1000000))
  .aggregate((w) => ({
    country_count: w.name.count(),
  }));
