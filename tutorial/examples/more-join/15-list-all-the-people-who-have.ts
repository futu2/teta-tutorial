import {
  and,
  dropOverlapRight,
  eq,
  filter,
  fold,
  group,
  inner,
  join,
  map,
  ne,
  pipe,
  t,
  table,
} from "@teta/teta";
export const code = `import {
  and,
  dropOverlapRight,
  eq,
  filter,
  fold,
  group,
  inner,
  join,
  map,
  ne,
  pipe,
  t,
  table,
} from "@teta/teta";
const casting = table("casting", {
  movieid: t.int(),
  actorid: t.int(),
});
const actor = table("actor", {
  id: t.int(),
  name: t.string(),
});
const castA = pipe(
  casting,
  map((c) => ({
    a_movieid: c.movieid,
    a_actorid: c.actorid,
  })),
);
const castB = pipe(
  casting,
  map((c) => ({
    b_movieid: c.movieid,
    b_actorid: c.actorid,
  })),
);
const actorA = pipe(
  actor,
  map((a) => ({
    a_id: a.id,
    a_name: a.name,
  })),
);
const actorB = pipe(
  actor,
  map((a) => ({
    b_id: a.id,
    b_name: a.name,
  })),
);
const query = pipe(
  castA,
  join(
    castB,
    inner((a, b) => eq(a.a_movieid, b.b_movieid), dropOverlapRight()),
  ),
  join(
    actorA,
    inner((a, aa) => eq(a.a_actorid, aa.a_id), dropOverlapRight()),
  ),
  join(
    actorB,
    inner((a, bb) => eq(a.b_actorid, bb.b_id), dropOverlapRight()),
  ),
  filter((a) => and(eq(a.b_name, "Art Garfunkel"), ne(a.a_id, a.b_id))),
  fold((a) => ({
    name: group(a.a_name),
  })),
);
query;`;
const casting = table("casting", {
  movieid: t.int(),
  actorid: t.int(),
});
const actor = table("actor", {
  id: t.int(),
  name: t.string(),
});
const castA = pipe(
  casting,
  map((c) => ({
    a_movieid: c.movieid,
    a_actorid: c.actorid,
  })),
);
const castB = pipe(
  casting,
  map((c) => ({
    b_movieid: c.movieid,
    b_actorid: c.actorid,
  })),
);
const actorA = pipe(
  actor,
  map((a) => ({
    a_id: a.id,
    a_name: a.name,
  })),
);
const actorB = pipe(
  actor,
  map((a) => ({
    b_id: a.id,
    b_name: a.name,
  })),
);
export const query = pipe(
  castA,
  join(
    castB,
    inner((a, b) => eq(a.a_movieid, b.b_movieid), dropOverlapRight()),
  ),
  join(
    actorA,
    inner((a, aa) => eq(a.a_actorid, aa.a_id), dropOverlapRight()),
  ),
  join(
    actorB,
    inner((a, bb) => eq(a.b_actorid, bb.b_id), dropOverlapRight()),
  ),
  filter((a) => and(eq(a.b_name, "Art Garfunkel"), ne(a.a_id, a.b_id))),
  fold((a) => ({
    name: group(a.a_name),
  })),
);
