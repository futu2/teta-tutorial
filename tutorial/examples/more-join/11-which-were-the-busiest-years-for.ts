import {
  count,
  dropOverlapRight,
  eq,
  filter,
  fold,
  group,
  gt,
  inner,
  join,
  pipe,
  t,
  table,
} from "@teta/teta";
export const code = `import {
  count,
  dropOverlapRight,
  eq,
  filter,
  fold,
  group,
  gt,
  inner,
  join,
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
  filter((m) => eq(m.name, "Rock Hudson")),
  fold((m) => ({
    yr: group(m.yr),
    movie_count: count(m.title),
  })),
  filter((m) => gt(m.movie_count, 2)),
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
  filter((m) => eq(m.name, "Rock Hudson")),
  fold((m) => ({
    yr: group(m.yr),
    movie_count: count(m.title),
  })),
  filter((m) => gt(m.movie_count, 2)),
);
