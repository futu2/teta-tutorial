import { eq, filter, fold, or, pipe, sum, t, table } from "@teta/teta";
export const code = `import { eq, filter, fold, or, pipe, sum, t, table } from "@teta/teta";
const world = table("world", {
  name: t.string(),
  population: t.int(),
});
const query = pipe(
  world,
  filter((w) =>
    or(
      or(eq(w.name, "Estonia"), eq(w.name, "Latvia")),
      eq(w.name, "Lithuania"),
    ),
  ),
  fold((w) => ({
    total_population: sum(w.population),
  })),
);
query;`;
export const query = pipe(
  table("world", {
    name: t.string(),
    population: t.int(),
  }),
  filter((w) =>
    or(
      or(eq(w.name, "Estonia"), eq(w.name, "Latvia")),
      eq(w.name, "Lithuania"),
    ),
  ),
  fold((w) => ({
    total_population: sum(w.population),
  })),
);
