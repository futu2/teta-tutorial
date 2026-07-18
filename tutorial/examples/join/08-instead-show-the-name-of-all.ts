import {
  and,
  dropOverlapRight,
  eq,
  filter,
  fold,
  group,
  inner,
  join,
  ne,
  or,
  pipe,
  t,
  table,
} from "@teta/teta";
export const code = `import {
  and,
  dropOverlapRight,
  eq,
  filter,
  fold,
  group,
  inner,
  join,
  ne,
  or,
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
  teamid: t.string(),
  player: t.string(),
});
const query = pipe(
  game,
  join(
    goal,
    inner((g, go) => eq(g.id, go.matchid), dropOverlapRight()),
  ),
  filter((g) =>
    and(or(eq(g.team1, "GER"), eq(g.team2, "GER")), ne(g.teamid, "GER")),
  ),
  fold((g) => ({
    player: group(g.player),
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
  teamid: t.string(),
  player: t.string(),
});
export const query = pipe(
  game,
  join(
    goal,
    inner((g, go) => eq(g.id, go.matchid), dropOverlapRight()),
  ),
  filter((g) =>
    and(or(eq(g.team1, "GER"), eq(g.team2, "GER")), ne(g.teamid, "GER")),
  ),
  fold((g) => ({
    player: group(g.player),
  })),
);
