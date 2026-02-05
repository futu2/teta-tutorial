import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const world = table("world", {
  name: t.string(),
  population: t.int(),
});

const query = world
  .filter((w) =>
    w.name
      .eq("France")
      .or(w.name.eq("Germany"))
      .or(w.name.eq("Italy"))
  )
  .select((w) => ({
    name: w.name,
    population: w.population,
  }));

query;`;

export const query = table("world", {
  name: t.string(),
  population: t.int(),
})
  .filter((w) =>
    w.name
      .eq("France")
      .or(w.name.eq("Germany"))
      .or(w.name.eq("Italy"))
  )
  .select((w) => ({
    name: w.name,
    population: w.population,
  }));
