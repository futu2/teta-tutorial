import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const nobel = table("nobel", {
  yr: t.int(),
  subject: t.string(),
  winner: t.string(),
});

const query = nobel
  .filter((n) =>
    n
      .yr.eq(1980)
      .and(n.subject.ne("chemistry"))
      .and(n.subject.ne("medicine"))
  )
  .select((n) => ({
    yr: n.yr,
    subject: n.subject,
    winner: n.winner,
  }));

query;`;

export const query = table("nobel", {
  yr: t.int(),
  subject: t.string(),
  winner: t.string(),
})
  .filter((n) =>
    n
      .yr.eq(1980)
      .and(n.subject.ne("chemistry"))
      .and(n.subject.ne("medicine"))
  )
  .select((n) => ({
    yr: n.yr,
    subject: n.subject,
    winner: n.winner,
  }));
