import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const actor = table("actor", {
  id: t.int(),
  name: t.string(),
});

const query = actor
  .filter((a) => a.name.eq("Glenn Close"))
  .select((a) => ({
    id: a.id,
  }));

query;`;

export const query = table("actor", {
  id: t.int(),
  name: t.string(),
})
  .filter((a) => a.name.eq("Glenn Close"))
  .select((a) => ({
    id: a.id,
  }));
