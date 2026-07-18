import {
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
  filter((m) => eq(m.title, "Alien")),
  map((m) => ({
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
  filter((m) => eq(m.title, "Alien")),
  map((m) => ({
    name: m.name,
  })),
);
