import { and, eq, filter, map, pipe, t, table } from "@teta/teta";
export const code = `import { and, eq, filter, map, pipe, t, table } from "@teta/teta";
const nobel = table("nobel", {
  yr: t.int(),
  subject: t.string(),
  winner: t.string(),
});
const query = pipe(
  nobel,
  filter((n) => and(eq(n.yr, 1962), eq(n.subject, "literature"))),
  map((n) => ({
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
  filter((n) => and(eq(n.yr, 1962), eq(n.subject, "literature"))),
  map((n) => ({
    winner: n.winner,
  })),
);
