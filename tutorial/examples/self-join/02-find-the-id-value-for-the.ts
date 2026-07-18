import { eq, filter, map, pipe, t, table } from "@teta/teta";
export const code = `import { eq, filter, map, pipe, t, table } from "@teta/teta";
const stops = table("stops", {
  id: t.int(),
  name: t.string(),
});
const query = pipe(
  stops,
  filter((s) => eq(s.name, "Craiglockhart")),
  map((s) => ({
    id: s.id,
  })),
);
query;`;
export const query = pipe(
  table("stops", {
    id: t.int(),
    name: t.string(),
  }),
  filter((s) => eq(s.name, "Craiglockhart")),
  map((s) => ({
    id: s.id,
  })),
);
