import { fold, pipe, sum, t, table } from "@teta/teta";
export const code = `import { fold, pipe, sum, t, table } from "@teta/teta";
const world = table("world", {
  population: t.int(),
});
const query = pipe(
  world,
  fold((w) => ({
    total_population: sum(w.population),
  })),
);
query;`;
export const query = pipe(
  table("world", {
    population: t.int(),
  }),
  fold((w) => ({
    total_population: sum(w.population),
  })),
);
