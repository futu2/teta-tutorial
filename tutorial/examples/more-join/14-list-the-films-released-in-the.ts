import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const movie = table("movie", {
  id: t.int(),
  title: t.string(),
  yr: t.int(),
});

const casting = table("casting", {
  movieid: t.int(),
  actorid: t.int(),
});

const query = movie
  .join(casting, (m, c) => m.id.eq(c.movieid))
  .filter((m) => m.yr.eq(1978))
  .aggregate((m) => ({
    title: m.title.group(),
    cast_count: m.actorid.count(),
  }))
  .orderBy((m) => [m.cast_count.desc(), m.title.asc()]);

query;`;

const movie = table("movie", {
  id: t.int(),
  title: t.string(),
  yr: t.int(),
});

const casting = table("casting", {
  movieid: t.int(),
  actorid: t.int(),
});

export const query = movie
  .join(casting, (m, c) => m.id.eq(c.movieid))
  .filter((m) => m.yr.eq(1978))
  .aggregate((m) => ({
    title: m.title.group(),
    cast_count: m.actorid.count(),
  }))
  .orderBy((m) => [m.cast_count.desc(), m.title.asc()]);
