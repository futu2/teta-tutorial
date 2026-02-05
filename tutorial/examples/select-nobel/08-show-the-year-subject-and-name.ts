import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const nobel = table("nobel", {
  yr: t.int(),
  subject: t.string(),
  winner: t.string(),
});

const query = nobel
  .filter((n) =>
    n.subject
      .eq("physics")
      .and(n.yr.eq(1980))
      .or(n.subject.eq("chemistry").and(n.yr.eq(1984)))
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
    n.subject
      .eq("physics")
      .and(n.yr.eq(1980))
      .or(n.subject.eq("chemistry").and(n.yr.eq(1984)))
  )
  .select((n) => ({
    yr: n.yr,
    subject: n.subject,
    winner: n.winner,
  }));
