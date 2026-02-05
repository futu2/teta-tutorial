import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const game = table("game", {
  id: t.int(),
  team1: t.string(),
  team2: t.string(),
});

const goal = table("goal", {
  matchid: t.int(),
  teamid: t.string(),
  player: t.string(),
});

const query = game
  .join(goal, (g, go) => g.id.eq(go.matchid))
  .filter((g) =>
    g
      .team1.eq("GER")
      .or(g.team2.eq("GER"))
      .and(g.teamid.ne("GER"))
  )
  .aggregate((g) => ({
    player: g.player.group(),
  }));

query;`;

const game = table("game", {
  id: t.int(),
  team1: t.string(),
  team2: t.string(),
});

const goal = table("goal", {
  matchid: t.int(),
  teamid: t.string(),
  player: t.string(),
});

export const query = game
  .join(goal, (g, go) => g.id.eq(go.matchid))
  .filter((g) =>
    g
      .team1.eq("GER")
      .or(g.team2.eq("GER"))
      .and(g.teamid.ne("GER"))
  )
  .aggregate((g) => ({
    player: g.player.group(),
  }));
