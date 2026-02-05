import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const game = table("game", {
  id: t.int(),
  team1: t.string(),
  team2: t.string(),
});

const goal = table("goal", {
  matchid: t.int(),
  player: t.string(),
});

const query = game
  .join(goal, (g, go) => g.id.eq(go.matchid))
  .filter((g) => g.player.like("Mario%"))
  .select((g) => ({
    team1: g.team1,
    team2: g.team2,
    player: g.player,
  }));

query;`;

const game = table("game", {
  id: t.int(),
  team1: t.string(),
  team2: t.string(),
});

const goal = table("goal", {
  matchid: t.int(),
  player: t.string(),
});

export const query = game
  .join(goal, (g, go) => g.id.eq(go.matchid))
  .filter((g) => g.player.like("Mario%"))
  .select((g) => ({
    team1: g.team1,
    team2: g.team2,
    player: g.player,
  }));
