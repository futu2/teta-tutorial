import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const goal = table("goal", {
  matchid: t.int(),
  player: t.string(),
});

const game = table("game", {
  id: t.int(),
  stadium: t.string(),
});

const query = goal
  .join(game, (g, gm) => g.matchid.eq(gm.id))
  .filter((g) => g.stadium.eq("National Stadium, Warsaw"))
  .select((g) => ({
    player: g.player,
  }));

query;`;

const goal = table("goal", {
  matchid: t.int(),
  player: t.string(),
});

const game = table("game", {
  id: t.int(),
  stadium: t.string(),
});

export const query = goal
  .join(game, (g, gm) => g.matchid.eq(gm.id))
  .filter((g) => g.stadium.eq("National Stadium, Warsaw"))
  .select((g) => ({
    player: g.player,
  }));
