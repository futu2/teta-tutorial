import { fold, group, pipe, t, table } from "@teta/teta";
export const code = `import { fold, group, pipe, t, table } from "@teta/teta";
const world = table("world", {
  continent: t.string(),
});
const query = pipe(
  world,
  fold((w) => ({
    continent: group(w.continent),
  })),
);
query;`;
export const query = pipe(
  table("world", {
    continent: t.string(),
  }),
  fold((w) => ({
    continent: group(w.continent),
  })),
);
