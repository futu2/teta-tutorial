import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const stops = table("stops", {
  id: t.int(),
});

const query = stops.aggregate((s) => ({
  stop_count: s.id.count(),
}));

query;`;

export const query = table("stops", {
  id: t.int(),
}).aggregate((s) => ({
  stop_count: s.id.count(),
}));
