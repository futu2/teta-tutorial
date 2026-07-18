import { eq, filter, map, or, pipe, t, table } from "@teta/teta";
export const code = `import { eq, filter, map, or, pipe, t, table } from "@teta/teta";
const nobel = table("nobel", {
  yr: t.int(),
  subject: t.string(),
  winner: t.string(),
});
const query = pipe(
  nobel,
  filter((n) =>
    or(
      or(
        or(
          eq(n.winner, "Theodore Roosevelt"),
          eq(n.winner, "Thomas Woodrow Wilson"),
        ),
        eq(n.winner, "Jimmy Carter"),
      ),
      eq(n.winner, "Barack Obama"),
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
      or(
        or(
          eq(n.winner, "Theodore Roosevelt"),
          eq(n.winner, "Thomas Woodrow Wilson"),
        ),
        eq(n.winner, "Jimmy Carter"),
      ),
      eq(n.winner, "Barack Obama"),
    ),
  ),
  map((n) => ({
    yr: n.yr,
    subject: n.subject,
    winner: n.winner,
  })),
);
