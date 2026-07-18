import { asc, desc, filter, like, map, pipe, sort, t, table } from "@teta/teta";
export const code = `import { asc, desc, filter, like, map, pipe, sort, t, table } from "@teta/teta";
const nobel = table("nobel", {
  yr: t.int(),
  subject: t.string(),
  winner: t.string(),
});
const query = pipe(
  nobel,
  filter((n) => like(n.winner, "Sir%")),
  map((n) => ({
    winner: n.winner,
    yr: n.yr,
    subject: n.subject,
  })),
  sort((n) => [desc(n.yr), asc(n.winner)]),
);
query;`;
export const query = pipe(
  table("nobel", {
    yr: t.int(),
    subject: t.string(),
    winner: t.string(),
  }),
  filter((n) => like(n.winner, "Sir%")),
  map((n) => ({
    winner: n.winner,
    yr: n.yr,
    subject: n.subject,
  })),
  sort((n) => [desc(n.yr), asc(n.winner)]),
);
