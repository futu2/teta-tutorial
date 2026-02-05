import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const nobel = table("nobel", {
  yr: t.int(),
  subject: t.string(),
  winner: t.string(),
});

const query = nobel
  .filter((n) => n.winner.eq("Albert Einstein"))
  .select((n) => ({
    yr: n.yr,
    subject: n.subject,
  }));

query;`;

export const query = table("nobel", {
  yr: t.int(),
  subject: t.string(),
  winner: t.string(),
})
  .filter((n) => n.winner.eq("Albert Einstein"))
  .select((n) => ({
    yr: n.yr,
    subject: n.subject,
  }));
