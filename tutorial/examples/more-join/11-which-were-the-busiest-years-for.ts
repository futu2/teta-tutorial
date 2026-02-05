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

const actor = table("actor", {
  id: t.int(),
  name: t.string(),
});

const query = movie
  .join(casting, (m, c) => m.id.eq(c.movieid))
  .join(actor, (m, a) => m.actorid.eq(a.id))
  .filter((m) => m.name.eq("Rock Hudson"))
  .aggregate((m) => ({
    yr: m.yr.group(),
    movie_count: m.title.count(),
  }))
  .filter((m) => m.movie_count.gt(2));

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

const actor = table("actor", {
  id: t.int(),
  name: t.string(),
});

export const query = movie
  .join(casting, (m, c) => m.id.eq(c.movieid))
  .join(actor, (m, a) => m.actorid.eq(a.id))
  .filter((m) => m.name.eq("Rock Hudson"))
  .aggregate((m) => ({
    yr: m.yr.group(),
    movie_count: m.title.count(),
  }))
  .filter((m) => m.movie_count.gt(2));
