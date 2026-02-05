import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const world = table("world", {
  name: t.string(),
  capital: t.string(),
});

const query = world
  .filter((w) =>
    w
      .name.substring(1, 1)
      .eq(w.capital.substring(1, 1))
      .and(w.name.ne(w.capital))
  )
  .select((w) => ({
    name: w.name,
    capital: w.capital,
  }));

query;`;

export const query = table("world", {
  name: t.string(),
  capital: t.string(),
})
  .filter((w) =>
    w
      .name.substring(1, 1)
      .eq(w.capital.substring(1, 1))
      .and(w.name.ne(w.capital))
  )
  .select((w) => ({
    name: w.name,
    capital: w.capital,
  }));
