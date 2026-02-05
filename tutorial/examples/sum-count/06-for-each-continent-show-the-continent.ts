import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const world = table("world", {
  continent: t.string(),
  name: t.string(),
});

const query = world.aggregate((w) => ({
  continent: w.continent.group(),
  country_count: w.name.count(),
}));

query;`;

export const query = table("world", {
  continent: t.string(),
  name: t.string(),
}).aggregate((w) => ({
  continent: w.continent.group(),
  country_count: w.name.count(),
}));
