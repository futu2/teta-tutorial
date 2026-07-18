import {
  dropOverlapRight,
  eq,
  filter,
  fold,
  group,
  inner,
  join,
  map,
  pipe,
  t,
  table,
} from "@teta/teta";
export const code = `import {
  dropOverlapRight,
  eq,
  filter,
  fold,
  group,
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
const julieMovies = pipe(
  casting,
  join(
    actor,
    inner((c, a) => eq(c.actorid, a.id), dropOverlapRight()),
  ),
  filter((c) => eq(c.name, "Julie Andrews")),
  fold((c) => ({
    movieid: group(c.movieid),
  })),
);
const query = pipe(
  movie,
  join(
    casting,
    inner((m, c) => eq(m.id, c.movieid), dropOverlapRight()),
  ),
  join(
    actor,
    inner((m, a) => eq(m.actorid, a.id), dropOverlapRight()),
  ),
  filter((m) => eq(m.ord, 1)),
  join(
    julieMovies,
    inner((m, j) => eq(m.id, j.movieid), dropOverlapRight()),
  ),
  map((m) => ({
    title: m.title,
    name: m.name,
  })),
);
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
const julieMovies = pipe(
  casting,
  join(
    actor,
    inner((c, a) => eq(c.actorid, a.id), dropOverlapRight()),
  ),
  filter((c) => eq(c.name, "Julie Andrews")),
  fold((c) => ({
    movieid: group(c.movieid),
  })),
);
export const query = pipe(
  movie,
  join(
    casting,
    inner((m, c) => eq(m.id, c.movieid), dropOverlapRight()),
  ),
  join(
    actor,
    inner((m, a) => eq(m.actorid, a.id), dropOverlapRight()),
  ),
  filter((m) => eq(m.ord, 1)),
  join(
    julieMovies,
    inner((m, j) => eq(m.id, j.movieid), dropOverlapRight()),
  ),
  map((m) => ({
    title: m.title,
    name: m.name,
  })),
);
