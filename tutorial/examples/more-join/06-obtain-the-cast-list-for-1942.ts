import {
  and,
  dropOverlapRight,
  eq,
  filter,
  inner,
  join,
  map,
  pipe,
  t,
  table,
} from "@teta/teta";
export const code = `import {
  and,
  dropOverlapRight,
  eq,
  filter,
  inner,
  join,
  map,
  pipe,
  t,
  table,
} from "@teta/teta";
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
const casablanca = pipe(
  movie,
  filter((m) => and(eq(m.title, "Casablanca"), eq(m.yr, 1942))),
  map((m) => ({
    movie_id: m.id,
  })),
);
const query = pipe(
  casting,
  join(
    casablanca,
    inner((c, m) => eq(c.movieid, m.movie_id), dropOverlapRight()),
  ),
  join(
    actor,
    inner((c, a) => eq(c.actorid, a.id), dropOverlapRight()),
  ),
  map((c) => ({
    name: c.name,
  })),
);
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
const casablanca = pipe(
  movie,
  filter((m) => and(eq(m.title, "Casablanca"), eq(m.yr, 1942))),
  map((m) => ({
    movie_id: m.id,
  })),
);
export const query = pipe(
  casting,
  join(
    casablanca,
    inner((c, m) => eq(c.movieid, m.movie_id), dropOverlapRight()),
  ),
  join(
    actor,
    inner((c, a) => eq(c.actorid, a.id), dropOverlapRight()),
  ),
  map((c) => ({
    name: c.name,
  })),
);
