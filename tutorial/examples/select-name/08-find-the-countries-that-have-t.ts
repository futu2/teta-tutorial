import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const world = table("world", {
  name: t.string(),
});

const query = world
  .filter((w) => w.name.like("_t%"))
  .orderBy((w) => w.name.asc())
  .select((w) => ({
    name: w.name,
  }));

query;`;

export const query = table("world", {
  name: t.string(),
})
  .filter((w) => w.name.like("_t%"))
  .orderBy((w) => w.name.asc())
  .select((w) => ({
    name: w.name,
  }));
