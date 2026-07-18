import { and, eq, filter, map, or, pipe, t, table } from "@teta/teta";
export const code = `import { and, eq, filter, map, or, pipe, t, table } from "@teta/teta";
const nobel = table("nobel", {
  yr: t.int(),
  subject: t.string(),
  winner: t.string(),
});
const query = pipe(
  nobel,
  filter((n) =>
    or(
      and(eq(n.subject, "physics"), eq(n.yr, 1980)),
      and(eq(n.subject, "chemistry"), eq(n.yr, 1984)),
    ),
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
    or(
      and(eq(n.subject, "physics"), eq(n.yr, 1980)),
      and(eq(n.subject, "chemistry"), eq(n.yr, 1984)),
    ),
  ),
  map((n) => ({
    yr: n.yr,
    subject: n.subject,
    winner: n.winner,
  })),
);
