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
const goal = table("goal", {
  matchid: t.int(),
  player: t.string(),
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
  filter((g) => eq(g.stadium, "National Stadium, Warsaw")),
  map((g) => ({
    player: g.player,
  })),
);
query;`;
const goal = table("goal", {
  matchid: t.int(),
  player: t.string(),
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
  filter((g) => eq(g.stadium, "National Stadium, Warsaw")),
  map((g) => ({
    player: g.player,
  })),
);
