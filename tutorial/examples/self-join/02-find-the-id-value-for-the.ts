import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const stops = table("stops", {
  id: t.int(),
  name: t.string(),
});

const query = stops
  .filter((s) => s.name.eq("Craiglockhart"))
  .select((s) => ({
    id: s.id,
  }));

query;`;

export const query = table("stops", {
  id: t.int(),
  name: t.string(),
})
  .filter((s) => s.name.eq("Craiglockhart"))
  .select((s) => ({
    id: s.id,
  }));
