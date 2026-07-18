import { filter, like, map, pipe, t, table } from "@teta/teta";
export const code = `import { filter, like, map, pipe, t, table } from "@teta/teta";
const nobel = table("nobel", {
  winner: t.string(),
});
const query = pipe(
  nobel,
  filter((n) => like(n.winner, "John %")),
  map((n) => ({
    winner: n.winner,
  })),
);
query;`;
export const query = pipe(
  table("nobel", {
    winner: t.string(),
  }),
  filter((n) => like(n.winner, "John %")),
  map((n) => ({
    winner: n.winner,
  })),
);
