import {
  count,
  dropOverlapRight,
  eq,
  filter,
  fold,
  group,
  inner,
  join,
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
  pipe,
  t,
  table,
} from "@teta/teta";
const game = table("game", {
  id: t.int(),
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
  filter((g) => eq(g.teamid, "GER")),
  fold((g) => ({
    matchid: group(g.matchid),
    mdate: group(g.mdate),
    goal_count: count(g.teamid),
  })),
);
query;`;
const game = table("game", {
  id: t.int(),
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
  filter((g) => eq(g.teamid, "GER")),
  fold((g) => ({
    matchid: group(g.matchid),
    mdate: group(g.mdate),
    goal_count: count(g.teamid),
  })),
);
