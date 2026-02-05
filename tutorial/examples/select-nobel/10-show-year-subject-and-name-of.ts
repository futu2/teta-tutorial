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
      .eq("medicine")
      .and(n.yr.lt(1910))
      .or(n.subject.eq("literature").and(n.yr.gte(2004)))
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
      .eq("medicine")
      .and(n.yr.lt(1910))
      .or(n.subject.eq("literature").and(n.yr.gte(2004)))
  )
  .select((n) => ({
    yr: n.yr,
    subject: n.subject,
    winner: n.winner,
  }));
