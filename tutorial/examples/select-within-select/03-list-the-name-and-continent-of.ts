import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const world = table("world", {
  name: t.string(),
  continent: t.string(),
});

const targetContinents = world
  .filter((w) => w.name.eq("Australia").or(w.name.eq("Argentina")))
  .aggregate((w) => ({
    continent: w.continent.group(),
  }));

const query = world
  .join(targetContinents, (w, c) => w.continent.eq(c.continent))
  .select((w) => ({
    name: w.name,
    continent: w.continent,
  }))
  .orderBy((w) => w.name.asc());

query;`;

const world = table("world", {
  name: t.string(),
  continent: t.string(),
});

const targetContinents = world
  .filter((w) => w.name.eq("Australia").or(w.name.eq("Argentina")))
  .aggregate((w) => ({
    continent: w.continent.group(),
  }));

export const query = world
  .join(targetContinents, (w, c) => w.continent.eq(c.continent))
  .select((w) => ({
    name: w.name,
    continent: w.continent,
  }))
  .orderBy((w) => w.name.asc());
