import {
  asc,
  count,
  dropOverlapRight,
  eq,
  filter,
  fold,
  group,
  gte,
  inner,
  join,
  map,
  pipe,
  sort,
  t,
  table,
} from "@teta/teta";
export const code = `import {
  asc,
  count,
  dropOverlapRight,
  eq,
  filter,
  fold,
  group,
  gte,
  inner,
  join,
  map,
  pipe,
  sort,
  t,
  table,
} from "@teta/teta";
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
  casting,
  join(
    actor,
    inner((c, a) => eq(c.actorid, a.id), dropOverlapRight()),
  ),
  filter((c) => eq(c.ord, 1)),
  fold((c) => ({
    name: group(c.name),
    starring_roles: count(c.movieid),
  })),
  filter((c) => gte(c.starring_roles, 15)),
  sort((c) => asc(c.name)),
  map((c) => ({
    name: c.name,
  })),
);
query;`;
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
  casting,
  join(
    actor,
    inner((c, a) => eq(c.actorid, a.id), dropOverlapRight()),
  ),
  filter((c) => eq(c.ord, 1)),
  fold((c) => ({
    name: group(c.name),
    starring_roles: count(c.movieid),
  })),
  filter((c) => gte(c.starring_roles, 15)),
  sort((c) => asc(c.name)),
  map((c) => ({
    name: c.name,
  })),
);
