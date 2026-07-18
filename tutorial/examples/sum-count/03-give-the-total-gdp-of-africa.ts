import { eq, filter, fold, pipe, sum, t, table } from "@teta/teta";
export const code = `import { eq, filter, fold, pipe, sum, t, table } from "@teta/teta";
const world = table("world", {
  continent: t.string(),
  gdp: t.float(),
});
const query = pipe(
  world,
  filter((w) => eq(w.continent, "Africa")),
  fold((w) => ({
    total_gdp: sum(w.gdp),
  })),
);
query;`;
export const query = pipe(
  table("world", {
    continent: t.string(),
    gdp: t.float(),
  }),
  filter((w) => eq(w.continent, "Africa")),
  fold((w) => ({
    total_gdp: sum(w.gdp),
  })),
);
