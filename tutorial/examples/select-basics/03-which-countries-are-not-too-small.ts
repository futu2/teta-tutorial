import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const world = table("world", {
  name: t.string(),
  area: t.int(),
});

const query = world
  .filter((w) => w.area.gte(200000).and(w.area.lte(250000)))
  .select((w) => ({
    name: w.name,
    area: w.area,
  }));

query;`;

export const query = table("world", {
  name: t.string(),
  area: t.int(),
})
  .filter((w) => w.area.gte(200000).and(w.area.lte(250000)))
  .select((w) => ({
    name: w.name,
    area: w.area,
  }));
