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

const casablanca = movie
  .filter((m) => m.title.eq("Casablanca").and(m.yr.eq(1942)))
  .select((m) => ({
    movie_id: m.id,
  }));

const query = casting
  .join(casablanca, (c, m) => c.movieid.eq(m.movie_id))
  .join(actor, (c, a) => c.actorid.eq(a.id))
  .select((c) => ({
    name: c.name,
  }));

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

const casablanca = movie
  .filter((m) => m.title.eq("Casablanca").and(m.yr.eq(1942)))
  .select((m) => ({
    movie_id: m.id,
  }));

export const query = casting
  .join(casablanca, (c, m) => c.movieid.eq(m.movie_id))
  .join(actor, (c, a) => c.actorid.eq(a.id))
  .select((c) => ({
    name: c.name,
  }));
