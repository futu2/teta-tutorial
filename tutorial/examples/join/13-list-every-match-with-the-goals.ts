import {
  dropOverlapRight,
  eq,
  fold,
  group,
  join,
  left,
  pipe,
  sum,
  t,
  table,
  when,
} from "@teta/teta";
export const code = `import {
  dropOverlapRight,
  eq,
  fold,
  group,
  join,
  left,
  pipe,
  sum,
  t,
  table,
  when,
} from "@teta/teta";
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
const query = pipe(
  game,
  join(
    goal,
    left((g, go) => eq(g.id, go.matchid), dropOverlapRight()),
  ),
  fold((g) => ({
    mdate: group(g.mdate),
    team1: group(g.team1),
    score1: sum(when(eq(g.teamid, g.team1), 1, true, 0)),
    team2: group(g.team2),
    score2: sum(when(eq(g.teamid, g.team2), 1, true, 0)),
  })),
);
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
export const query = pipe(
  game,
  join(
    goal,
    left((g, go) => eq(g.id, go.matchid), dropOverlapRight()),
  ),
  fold((g) => ({
    mdate: group(g.mdate),
    team1: group(g.team1),
    score1: sum(when(eq(g.teamid, g.team1), 1, true, 0)),
    team2: group(g.team2),
    score2: sum(when(eq(g.teamid, g.team2), 1, true, 0)),
  })),
);
