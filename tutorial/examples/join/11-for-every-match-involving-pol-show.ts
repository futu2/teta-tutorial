import {
  count,
  dropOverlapRight,
  eq,
  filter,
  fold,
  group,
  inner,
  join,
  or,
  pipe,
  t,
  table,
} from "@teta/teta";
export const code = `import {
  count,
  dropOverlapRight,
  eq,
  filter,
  fold,
  group,
  inner,
  join,
  or,
  pipe,
  t,
  table,
} from "@teta/teta";
const game = table("game", {
  id: t.int(),
  team1: t.string(),
  team2: t.string(),
  mdate: t.string(),
});
const goal = table("goal", {
  matchid: t.int(),
  teamid: t.string(),
});
const query = pipe(
  game,
  join(
    goal,
    inner((g, go) => eq(g.id, go.matchid), dropOverlapRight()),
  ),
  filter((g) => or(eq(g.team1, "POL"), eq(g.team2, "POL"))),
  fold((g) => ({
    matchid: group(g.matchid),
    mdate: group(g.mdate),
    goal_count: count(g.teamid),
  })),
);
query;`;
const game = table("game", {
  id: t.int(),
  team1: t.string(),
  team2: t.string(),
  mdate: t.string(),
});
const goal = table("goal", {
  matchid: t.int(),
  teamid: t.string(),
});
export const query = pipe(
  game,
  join(
    goal,
    inner((g, go) => eq(g.id, go.matchid), dropOverlapRight()),
  ),
  filter((g) => or(eq(g.team1, "POL"), eq(g.team2, "POL"))),
  fold((g) => ({
    matchid: group(g.matchid),
    mdate: group(g.mdate),
    goal_count: count(g.teamid),
  })),
);
