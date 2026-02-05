import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const stops = table("stops", {
  id: t.int(),
  name: t.string(),
});

const route = table("route", {
  company: t.string(),
  num: t.string(),
  stop: t.int(),
});

const query = stops
  .join(route, (s, r) => s.id.eq(r.stop))
  .filter((s) => s.company.eq("LRT").and(s.num.eq("4")))
  .select((s) => ({
    id: s.id,
    name: s.name,
  }));

query;`;

const stops = table("stops", {
  id: t.int(),
  name: t.string(),
});

const route = table("route", {
  company: t.string(),
  num: t.string(),
  stop: t.int(),
});

export const query = stops
  .join(route, (s, r) => s.id.eq(r.stop))
  .filter((s) => s.company.eq("LRT").and(s.num.eq("4")))
  .select((s) => ({
    id: s.id,
    name: s.name,
  }));
