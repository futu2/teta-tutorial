import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const world = table("world", {
  name: t.string(),
  continent: t.string(),
  population: t.int(),
});

const other = world.select((w) => ({
  other_name: w.name,
  other_continent: w.continent,
  other_population: w.population,
}));

const maxOther = world
  .join(other, (w, o) =>
    w.continent.eq(o.other_continent).and(w.name.ne(o.other_name))
  )
  .aggregate((w) => ({
    name: w.name.group(),
    continent: w.continent.group(),
    population: w.population.group(),
    max_other_population: w.other_population.max(),
  }));

const query = maxOther
  .filter((w) => w.population.gt(w.max_other_population.mul(3)))
  .select((w) => ({
    name: w.name,
    continent: w.continent,
  }));

query;`;

const world = table("world", {
  name: t.string(),
  continent: t.string(),
  population: t.int(),
});

const other = world.select((w) => ({
  other_name: w.name,
  other_continent: w.continent,
  other_population: w.population,
}));

const maxOther = world
  .join(other, (w, o) =>
    w.continent.eq(o.other_continent).and(w.name.ne(o.other_name))
  )
  .aggregate((w) => ({
    name: w.name.group(),
    continent: w.continent.group(),
    population: w.population.group(),
    max_other_population: w.other_population.max(),
  }));

export const query = maxOther
  .filter((w) => w.population.gt(w.max_other_population.mul(3)))
  .select((w) => ({
    name: w.name,
    continent: w.continent,
  }));
