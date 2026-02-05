import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const movie = table("movie", {
  id: t.int(),
  title: t.string(),
  yr: t.int(),
});

const query = movie
  .filter((m) => m.title.like("Star Trek%"))
  .select((m) => ({
    id: m.id,
    title: m.title,
    yr: m.yr,
  }))
  .orderBy((m) => m.yr.asc());

query;`;

export const query = table("movie", {
  id: t.int(),
  title: t.string(),
  yr: t.int(),
})
  .filter((m) => m.title.like("Star Trek%"))
  .select((m) => ({
    id: m.id,
    title: m.title,
    yr: m.yr,
  }))
  .orderBy((m) => m.yr.asc());
