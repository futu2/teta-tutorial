import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const game = table("game", {
  id: t.int(),
  stadium: t.string(),
  team1: t.string(),
  team2: t.string(),
});

const query = game
  .filter((g) => g.id.eq(1012))
  .select((g) => ({
    id: g.id,
    stadium: g.stadium,
    team1: g.team1,
    team2: g.team2,
  }));

query;`;

export const query = table("game", {
  id: t.int(),
  stadium: t.string(),
  team1: t.string(),
  team2: t.string(),
})
  .filter((g) => g.id.eq(1012))
  .select((g) => ({
    id: g.id,
    stadium: g.stadium,
    team1: g.team1,
    team2: g.team2,
  }));
