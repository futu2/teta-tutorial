import { table, t, when } from "@teta/teta";

export const code = `import { table, t, when } from "@teta/teta";

const game = table("game", {
  id: t.int(),
  mdate: t.string(),
  team1: t.string(),
  team2: t.string(),
});

const goal = table("goal", {
  matchid: t.int(),
  teamid: t.string(),
});

const query = game
  .leftJoin(goal, (g, go) => g.id.eq(go.matchid))
  .aggregate((g) => ({
    mdate: g.mdate.group(),
    team1: g.team1.group(),
    score1: when(g.teamid.eq(g.team1), 1).else(0).sum(),
    team2: g.team2.group(),
    score2: when(g.teamid.eq(g.team2), 1).else(0).sum(),
  }));

query;`;

const game = table("game", {
  id: t.int(),
  mdate: t.string(),
  team1: t.string(),
  team2: t.string(),
});

const goal = table("goal", {
  matchid: t.int(),
  teamid: t.string(),
});

export const query = game
  .leftJoin(goal, (g, go) => g.id.eq(go.matchid))
  .aggregate((g) => ({
    mdate: g.mdate.group(),
    team1: g.team1.group(),
    score1: when(g.teamid.eq(g.team1), 1).else(0).sum(),
    team2: g.team2.group(),
    score2: when(g.teamid.eq(g.team2), 1).else(0).sum(),
  }));
