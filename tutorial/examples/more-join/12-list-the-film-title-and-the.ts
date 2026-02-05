import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const movie = table("movie", {
  id: t.int(),
  title: t.string(),
});

const casting = table("casting", {
  movieid: t.int(),
  actorid: t.int(),
  ord: t.int(),
});

const actor = table("actor", {
  id: t.int(),
  name: t.string(),
});

const julieMovies = casting
  .join(actor, (c, a) => c.actorid.eq(a.id))
  .filter((c) => c.name.eq("Julie Andrews"))
  .aggregate((c) => ({
    movieid: c.movieid.group(),
  }));

const query = movie
  .join(casting, (m, c) => m.id.eq(c.movieid))
  .join(actor, (m, a) => m.actorid.eq(a.id))
  .filter((m) => m.ord.eq(1))
  .join(julieMovies, (m, j) => m.id.eq(j.movieid))
  .select((m) => ({
    title: m.title,
    name: m.name,
  }));

query;`;

const movie = table("movie", {
  id: t.int(),
  title: t.string(),
});

const casting = table("casting", {
  movieid: t.int(),
  actorid: t.int(),
  ord: t.int(),
});

const actor = table("actor", {
  id: t.int(),
  name: t.string(),
});

const julieMovies = casting
  .join(actor, (c, a) => c.actorid.eq(a.id))
  .filter((c) => c.name.eq("Julie Andrews"))
  .aggregate((c) => ({
    movieid: c.movieid.group(),
  }));

export const query = movie
  .join(casting, (m, c) => m.id.eq(c.movieid))
  .join(actor, (m, a) => m.actorid.eq(a.id))
  .filter((m) => m.ord.eq(1))
  .join(julieMovies, (m, j) => m.id.eq(j.movieid))
  .select((m) => ({
    title: m.title,
    name: m.name,
  }));
