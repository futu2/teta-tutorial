import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const movie = table("movie", {
  id: t.int(),
  title: t.string(),
  yr: t.int(),
});

const query = movie
  .filter((m) => m.title.eq("Casablanca").and(m.yr.eq(1942)))
  .select((m) => ({
    id: m.id,
  }));

query;`;

export const query = table("movie", {
  id: t.int(),
  title: t.string(),
  yr: t.int(),
})
  .filter((m) => m.title.eq("Casablanca").and(m.yr.eq(1942)))
  .select((m) => ({
    id: m.id,
  }));
