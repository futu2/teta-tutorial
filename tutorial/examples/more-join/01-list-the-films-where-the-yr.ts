import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const movie = table("movie", {
  id: t.int(),
  title: t.string(),
  yr: t.int(),
  budget: t.int(),
});

const query = movie
  .filter((m) => m.yr.eq(1962).and(m.budget.gt(2000000)))
  .select((m) => ({
    id: m.id,
    title: m.title,
  }));

query;`;

export const query = table("movie", {
  id: t.int(),
  title: t.string(),
  yr: t.int(),
  budget: t.int(),
})
  .filter((m) => m.yr.eq(1962).and(m.budget.gt(2000000)))
  .select((m) => ({
    id: m.id,
    title: m.title,
  }));
