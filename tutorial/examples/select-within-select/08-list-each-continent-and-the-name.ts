import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const world = table("world", {
  name: t.string(),
  continent: t.string(),
});

const minName = world.aggregate((w) => ({
  continent: w.continent.group(),
  first_name: w.name.min(),
}));

const query = world
  .join(minName, (w, m) =>
    w.continent.eq(m.continent).and(w.name.eq(m.first_name))
  )
  .select((w) => ({
    continent: w.continent,
    name: w.name,
  }));

query;`;

const world = table("world", {
  name: t.string(),
  continent: t.string(),
});

const minName = world.aggregate((w) => ({
  continent: w.continent.group(),
  first_name: w.name.min(),
}));

export const query = world
  .join(minName, (w, m) =>
    w.continent.eq(m.continent).and(w.name.eq(m.first_name))
  )
  .select((w) => ({
    continent: w.continent,
    name: w.name,
  }));
