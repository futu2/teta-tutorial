import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const casting = table("casting", {
  movieid: t.int(),
  actorid: t.int(),
  ord: t.int(),
});

const actor = table("actor", {
  id: t.int(),
  name: t.string(),
});

const query = casting
  .join(actor, (c, a) => c.actorid.eq(a.id))
  .filter((c) => c.ord.eq(1))
  .aggregate((c) => ({
    name: c.name.group(),
    starring_roles: c.movieid.count(),
  }))
  .filter((c) => c.starring_roles.gte(15))
  .orderBy((c) => c.name.asc())
  .select((c) => ({
    name: c.name,
  }));

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

export const query = casting
  .join(actor, (c, a) => c.actorid.eq(a.id))
  .filter((c) => c.ord.eq(1))
  .aggregate((c) => ({
    name: c.name.group(),
    starring_roles: c.movieid.count(),
  }))
  .filter((c) => c.starring_roles.gte(15))
  .orderBy((c) => c.name.asc())
  .select((c) => ({
    name: c.name,
  }));
