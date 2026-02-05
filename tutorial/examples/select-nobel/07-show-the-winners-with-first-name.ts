import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const nobel = table("nobel", {
  winner: t.string(),
});

const query = nobel
  .filter((n) => n.winner.like("John %"))
  .select((n) => ({
    winner: n.winner,
  }));

query;`;

export const query = table("nobel", {
  winner: t.string(),
})
  .filter((n) => n.winner.like("John %"))
  .select((n) => ({
    winner: n.winner,
  }));
