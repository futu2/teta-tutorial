import { count, fold, group, pipe, t, table } from "@teta/teta";
export const code = `import { count, fold, group, pipe, t, table } from "@teta/teta";
const world = table("world", {
  continent: t.string(),
  name: t.string(),
});
const query = pipe(
  world,
  fold((w) => ({
    continent: group(w.continent),
    country_count: count(w.name),
  })),
);
query;`;
export const query = pipe(
  table("world", {
    continent: t.string(),
    name: t.string(),
  }),
  fold((w) => ({
    continent: group(w.continent),
    country_count: count(w.name),
  })),
);
