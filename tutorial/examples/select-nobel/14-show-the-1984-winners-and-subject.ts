import {
  asc,
  eq,
  filter,
  map,
  or,
  pipe,
  sort,
  t,
  table,
  when,
} from "@teta/teta";
export const code = `import {
  asc,
  eq,
  filter,
  map,
  or,
  pipe,
  sort,
  t,
  table,
  when,
} from "@teta/teta";
const nobel = table("nobel", {
  yr: t.int(),
  subject: t.string(),
  winner: t.string(),
});
const query = pipe(
  nobel,
  filter((n) => eq(n.yr, 1984)),
  map((n) => ({
    winner: n.winner,
    subject: n.subject,
  })),
  sort((n) => [
    asc(
      when(
        or(eq(n.subject, "physics"), eq(n.subject, "chemistry")),
        1,
        true,
        0,
      ),
    ),
    asc(n.subject),
    asc(n.winner),
  ]),
);
query;`;
export const query = pipe(
  table("nobel", {
    yr: t.int(),
    subject: t.string(),
    winner: t.string(),
  }),
  filter((n) => eq(n.yr, 1984)),
  map((n) => ({
    winner: n.winner,
    subject: n.subject,
  })),
  sort((n) => [
    asc(
      when(
        or(eq(n.subject, "physics"), eq(n.subject, "chemistry")),
        1,
        true,
        0,
      ),
    ),
    asc(n.subject),
    asc(n.winner),
  ]),
);
