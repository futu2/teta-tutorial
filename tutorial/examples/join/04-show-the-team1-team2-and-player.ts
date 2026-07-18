import {
  dropOverlapRight,
  eq,
  filter,
  inner,
  join,
  like,
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
  like,
  map,
  pipe,
  t,
  table,
} from "@teta/teta";
const game = table("game", {
  id: t.int(),
  team1: t.string(),
  team2: t.string(),
});
const goal = table("goal", {
  matchid: t.int(),
  player: t.string(),
});
const query = pipe(
  game,
  join(
    goal,
    inner((g, go) => eq(g.id, go.matchid), dropOverlapRight()),
  ),
  filter((g) => like(g.player, "Mario%")),
  map((g) => ({
    team1: g.team1,
    team2: g.team2,
    player: g.player,
  })),
);
query;`;
const game = table("game", {
  id: t.int(),
  team1: t.string(),
  team2: t.string(),
});
const goal = table("goal", {
  matchid: t.int(),
  player: t.string(),
});
export const query = pipe(
  game,
  join(
    goal,
    inner((g, go) => eq(g.id, go.matchid), dropOverlapRight()),
  ),
  filter((g) => like(g.player, "Mario%")),
  map((g) => ({
    team1: g.team1,
    team2: g.team2,
    player: g.player,
  })),
);
