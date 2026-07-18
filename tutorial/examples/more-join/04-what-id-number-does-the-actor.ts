import { eq, filter, map, pipe, t, table } from "@teta/teta";
export const code = `import { eq, filter, map, pipe, t, table } from "@teta/teta";
const actor = table("actor", {
  id: t.int(),
  name: t.string(),
});
const query = pipe(
  actor,
  filter((a) => eq(a.name, "Glenn Close")),
  map((a) => ({
    id: a.id,
  })),
);
query;`;
export const query = pipe(
  table("actor", {
    id: t.int(),
    name: t.string(),
  }),
  filter((a) => eq(a.name, "Glenn Close")),
  map((a) => ({
    id: a.id,
  })),
);
