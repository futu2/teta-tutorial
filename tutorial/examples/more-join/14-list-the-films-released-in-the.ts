import {
  asc,
  count,
  desc,
  dropOverlapRight,
  eq,
  filter,
  fold,
  group,
  inner,
  join,
  pipe,
  sort,
  t,
  table,
} from "@teta/teta";
export const code = `import {
  asc,
  count,
  desc,
  dropOverlapRight,
  eq,
  filter,
  fold,
  group,
  inner,
  join,
  pipe,
  sort,
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
const query = pipe(
  movie,
  join(
    casting,
    inner((m, c) => eq(m.id, c.movieid), dropOverlapRight()),
  ),
  filter((m) => eq(m.yr, 1978)),
  fold((m) => ({
    title: group(m.title),
    cast_count: count(m.actorid),
  })),
  sort((m) => [desc(m.cast_count), asc(m.title)]),
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
export const query = pipe(
  movie,
  join(
    casting,
    inner((m, c) => eq(m.id, c.movieid), dropOverlapRight()),
  ),
  filter((m) => eq(m.yr, 1978)),
  fold((m) => ({
    title: group(m.title),
    cast_count: count(m.actorid),
  })),
  sort((m) => [desc(m.cast_count), asc(m.title)]),
);
