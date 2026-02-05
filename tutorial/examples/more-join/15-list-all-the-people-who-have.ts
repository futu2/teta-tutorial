import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const casting = table("casting", {
  movieid: t.int(),
  actorid: t.int(),
});

const actor = table("actor", {
  id: t.int(),
  name: t.string(),
});

const castA = casting.select((c) => ({
  a_movieid: c.movieid,
  a_actorid: c.actorid,
}));

const castB = casting.select((c) => ({
  b_movieid: c.movieid,
  b_actorid: c.actorid,
}));

const actorA = actor.select((a) => ({
  a_id: a.id,
  a_name: a.name,
}));

const actorB = actor.select((a) => ({
  b_id: a.id,
  b_name: a.name,
}));

const query = castA
  .join(castB, (a, b) => a.a_movieid.eq(b.b_movieid))
  .join(actorA, (a, aa) => a.a_actorid.eq(aa.a_id))
  .join(actorB, (a, bb) => a.b_actorid.eq(bb.b_id))
  .filter((a) => a.b_name.eq("Art Garfunkel").and(a.a_id.ne(a.b_id)))
  .aggregate((a) => ({
    name: a.a_name.group(),
  }));

query;`;

const casting = table("casting", {
  movieid: t.int(),
  actorid: t.int(),
});

const actor = table("actor", {
  id: t.int(),
  name: t.string(),
});

const castA = casting.select((c) => ({
  a_movieid: c.movieid,
  a_actorid: c.actorid,
}));

const castB = casting.select((c) => ({
  b_movieid: c.movieid,
  b_actorid: c.actorid,
}));

const actorA = actor.select((a) => ({
  a_id: a.id,
  a_name: a.name,
}));

const actorB = actor.select((a) => ({
  b_id: a.id,
  b_name: a.name,
}));

export const query = castA
  .join(castB, (a, b) => a.a_movieid.eq(b.b_movieid))
  .join(actorA, (a, aa) => a.a_actorid.eq(aa.a_id))
  .join(actorB, (a, bb) => a.b_actorid.eq(bb.b_id))
  .filter((a) => a.b_name.eq("Art Garfunkel").and(a.a_id.ne(a.b_id)))
  .aggregate((a) => ({
    name: a.a_name.group(),
  }));
