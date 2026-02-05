import { fn, table, t } from "@teta/teta";

export const code = `import { fn, table, t } from "@teta/teta";

const world = table("world", {
  name: t.string(),
  capital: t.string(),
});

const query = world
  .filter((w) => w.capital.like(fn("CONCAT", w.name, "_%")))
  .select((w) => ({
    name: w.name,
    extension: w.capital.replace(w.name, ""),
  }));

query;`;

export const query = table("world", {
  name: t.string(),
  capital: t.string(),
})
  .filter((w) => w.capital.like(fn("CONCAT", w.name, "_%")))
  .select((w) => ({
    name: w.name,
    extension: w.capital.replace(w.name, ""),
  }));
