import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const nobel = table("nobel", {
  yr: t.int(),
  subject: t.string(),
  winner: t.string(),
});

const query = nobel
  .filter((n) => n.winner.like("Sir%"))
  .select((n) => ({
    winner: n.winner,
    yr: n.yr,
    subject: n.subject,
  }))
  .orderBy((n) => [n.yr.desc(), n.winner.asc()]);

query;`;

export const query = table("nobel", {
  yr: t.int(),
  subject: t.string(),
  winner: t.string(),
})
  .filter((n) => n.winner.like("Sir%"))
  .select((n) => ({
    winner: n.winner,
    yr: n.yr,
    subject: n.subject,
  }))
  .orderBy((n) => [n.yr.desc(), n.winner.asc()]);
