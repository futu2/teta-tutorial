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
  ord: t.int(),
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
  filter((m) => and(eq(m.yr, 1962), eq(m.ord, 1))),
  map((m) => ({
    title: m.title,
    name: m.name,
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
  ord: t.int(),
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
  filter((m) => and(eq(m.yr, 1962), eq(m.ord, 1))),
  map((m) => ({
    title: m.title,
    name: m.name,
  })),
);
