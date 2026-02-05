import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const goal = table("goal", {
  matchid: t.int(),
  teamid: t.string(),
});

const game = table("game", {
  id: t.int(),
  stadium: t.string(),
});

const query = goal
  .join(game, (g, gm) => g.matchid.eq(gm.id))
  .aggregate((g) => ({
    stadium: g.stadium.group(),
    goal_count: g.teamid.count(),
  }));

query;`;

const goal = table("goal", {
  matchid: t.int(),
  teamid: t.string(),
});

const game = table("game", {
  id: t.int(),
  stadium: t.string(),
});

export const query = goal
  .join(game, (g, gm) => g.matchid.eq(gm.id))
  .aggregate((g) => ({
    stadium: g.stadium.group(),
    goal_count: g.teamid.count(),
  }));
