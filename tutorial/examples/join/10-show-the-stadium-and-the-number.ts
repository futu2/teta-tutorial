import {
  count,
  dropOverlapRight,
  eq,
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
  fold,
  group,
  inner,
  join,
  pipe,
  t,
  table,
} from "@teta/teta";
const goal = table("goal", {
  matchid: t.int(),
  teamid: t.string(),
});
const game = table("game", {
  id: t.int(),
  stadium: t.string(),
});
const query = pipe(
  goal,
  join(
    game,
    inner((g, gm) => eq(g.matchid, gm.id), dropOverlapRight()),
  ),
  fold((g) => ({
    stadium: group(g.stadium),
    goal_count: count(g.teamid),
  })),
);
query;`;
const goal = table("goal", {
  matchid: t.int(),
  teamid: t.string(),
});
const game = table("game", {
  id: t.int(),
  stadium: t.string(),
});
export const query = pipe(
  goal,
  join(
    game,
    inner((g, gm) => eq(g.matchid, gm.id), dropOverlapRight()),
  ),
  fold((g) => ({
    stadium: group(g.stadium),
    goal_count: count(g.teamid),
  })),
);
