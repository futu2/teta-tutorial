import { filter, like, map, pipe, t, table } from "@teta/teta";
export const code = `import { filter, like, map, pipe, t, table } from "@teta/teta";
const world = table("world", {
  name: t.string(),
});
const query = pipe(
  world,
  filter((w) => like(w.name, "%y")),
  map((w) => ({
    name: w.name,
  })),
);
query;`;
export const query = pipe(
  table("world", {
    name: t.string(),
  }),
  filter((w) => like(w.name, "%y")),
  map((w) => ({
    name: w.name,
  })),
);
