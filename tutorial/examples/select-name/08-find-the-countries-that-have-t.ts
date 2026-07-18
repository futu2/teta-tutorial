import { asc, filter, like, map, pipe, sort, t, table } from "@teta/teta";
export const code = `import { asc, filter, like, map, pipe, sort, t, table } from "@teta/teta";
const world = table("world", {
  name: t.string(),
});
const query = pipe(
  world,
  filter((w) => like(w.name, "_t%")),
  sort((w) => asc(w.name)),
  map((w) => ({
    name: w.name,
  })),
);
query;`;
export const query = pipe(
  table("world", {
    name: t.string(),
  }),
  filter((w) => like(w.name, "_t%")),
  sort((w) => asc(w.name)),
  map((w) => ({
    name: w.name,
  })),
);
