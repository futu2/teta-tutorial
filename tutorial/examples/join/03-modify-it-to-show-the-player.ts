import {
  dropOverlapRight,
  eq,
  filter,
  inner,
  join,
  map,
  pipe,
  t,
  table,
} from "@teta/teta";
export const code = `import {
  dropOverlapRight,
  eq,
  filter,
  inner,
  join,
  map,
  pipe,
  t,
  table,
} from "@teta/teta";
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
const query = pipe(
  game,
  join(
    goal,
    inner((g, go) => eq(g.id, go.matchid), dropOverlapRight()),
  ),
  filter((g) => eq(g.teamid, "GER")),
  map((g) => ({
    player: g.player,
    teamid: g.teamid,
    stadium: g.stadium,
    mdate: g.mdate,
  })),
);
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
export const query = pipe(
  game,
  join(
    goal,
    inner((g, go) => eq(g.id, go.matchid), dropOverlapRight()),
  ),
  filter((g) => eq(g.teamid, "GER")),
  map((g) => ({
    player: g.player,
    teamid: g.teamid,
    stadium: g.stadium,
    mdate: g.mdate,
  })),
);
