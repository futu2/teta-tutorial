import { and, eq, filter, gte, lte, map, pipe, t, table } from "@teta/teta";
export const code = `import { and, eq, filter, gte, lte, map, pipe, t, table } from "@teta/teta";
const nobel = table("nobel", {
  yr: t.int(),
  subject: t.string(),
  winner: t.string(),
});
const query = pipe(
  nobel,
  filter((n) =>
    and(and(eq(n.subject, "literature"), gte(n.yr, 1980)), lte(n.yr, 1989)),
  ),
  map((n) => ({
    yr: n.yr,
    subject: n.subject,
    winner: n.winner,
  })),
);
query;`;
export const query = pipe(
  table("nobel", {
    yr: t.int(),
    subject: t.string(),
    winner: t.string(),
  }),
  filter((n) =>
    and(and(eq(n.subject, "literature"), gte(n.yr, 1980)), lte(n.yr, 1989)),
  ),
  map((n) => ({
    yr: n.yr,
    subject: n.subject,
    winner: n.winner,
  })),
);
