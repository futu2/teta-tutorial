import { table, t, when } from "@teta/teta";

export const code = `import { table, t, when } from "@teta/teta";

const nobel = table("nobel", {
  yr: t.int(),
  subject: t.string(),
  winner: t.string(),
});

const query = nobel
  .filter((n) => n.yr.eq(1984))
  .select((n) => ({
    winner: n.winner,
    subject: n.subject,
  }))
  .orderBy((n) => [
    when(n.subject.eq("physics").or(n.subject.eq("chemistry")), 1)
      .else(0)
      .asc(),
    n.subject.asc(),
    n.winner.asc(),
  ]);

query;`;

export const query = table("nobel", {
  yr: t.int(),
  subject: t.string(),
  winner: t.string(),
})
  .filter((n) => n.yr.eq(1984))
  .select((n) => ({
    winner: n.winner,
    subject: n.subject,
  }))
  .orderBy((n) => [
    when(n.subject.eq("physics").or(n.subject.eq("chemistry")), 1)
      .else(0)
      .asc(),
    n.subject.asc(),
    n.winner.asc(),
  ]);
