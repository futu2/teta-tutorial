import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const world = table("world", {
  name: t.string(),
  population: t.int(),
});

const query = world
  .filter((w) =>
    w.name
      .eq("Estonia")
      .or(w.name.eq("Latvia"))
      .or(w.name.eq("Lithuania"))
  )
  .aggregate((w) => ({
    total_population: w.population.sum(),
  }));

query;`;

export const query = table("world", {
  name: t.string(),
  population: t.int(),
})
  .filter((w) =>
    w.name
      .eq("Estonia")
      .or(w.name.eq("Latvia"))
      .or(w.name.eq("Lithuania"))
  )
  .aggregate((w) => ({
    total_population: w.population.sum(),
  }));
