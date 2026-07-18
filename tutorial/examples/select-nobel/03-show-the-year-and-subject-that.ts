import { eq, filter, map, pipe, t, table } from "@teta/teta";
export const code = `import { eq, filter, map, pipe, t, table } from "@teta/teta";
const nobel = table("nobel", {
  yr: t.int(),
  subject: t.string(),
  winner: t.string(),
});
const query = pipe(
  nobel,
  filter((n) => eq(n.winner, "Albert Einstein")),
  map((n) => ({
    yr: n.yr,
    subject: n.subject,
  })),
);
query;`;
export const query = pipe(
  table("nobel", {
    yr: t.int(),
    subject: t.string(),
    winner: t.string(),
  }),
  filter((n) => eq(n.winner, "Albert Einstein")),
  map((n) => ({
    yr: n.yr,
    subject: n.subject,
  })),
);
