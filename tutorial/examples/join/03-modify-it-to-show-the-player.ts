import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const game = table("game", {
  id: t.int(),
  stadium: t.string(),
  mdate: t.string(),
});

const goal = table("goal", {
  matchid: t.int(),
  teamid: t.string(),
  player: t.string(),
});

const query = game
  .join(goal, (g, go) => g.id.eq(go.matchid))
  .filter((g) => g.teamid.eq("GER"))
  .select((g) => ({
    player: g.player,
    teamid: g.teamid,
    stadium: g.stadium,
    mdate: g.mdate,
  }));

query;`;

const game = table("game", {
  id: t.int(),
  stadium: t.string(),
  mdate: t.string(),
});

const goal = table("goal", {
  matchid: t.int(),
  teamid: t.string(),
  player: t.string(),
});

export const query = game
  .join(goal, (g, go) => g.id.eq(go.matchid))
  .filter((g) => g.teamid.eq("GER"))
  .select((g) => ({
    player: g.player,
    teamid: g.teamid,
    stadium: g.stadium,
    mdate: g.mdate,
  }));
