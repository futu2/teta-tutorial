import { and, eq, filter, gte, map, pipe, t, table } from "@teta/teta";
export const code = `import { and, eq, filter, gte, map, pipe, t, table } from "@teta/teta";
const nobel = table("nobel", {
  yr: t.int(),
  subject: t.string(),
  winner: t.string(),
});
const query = pipe(
  nobel,
  filter((n) => and(eq(n.subject, "peace"), gte(n.yr, 2000))),
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
  filter((n) => and(eq(n.subject, "peace"), gte(n.yr, 2000))),
  map((n) => ({
    winner: n.winner,
  })),
);
