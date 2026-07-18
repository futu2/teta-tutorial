import { eq, filter, map, pipe, t, table } from "@teta/teta";
export const code = `import { eq, filter, map, pipe, t, table } from "@teta/teta";
const goal = table("goal", {
  matchid: t.int(),
  teamid: t.string(),
  player: t.string(),
});
const query = pipe(
  goal,
  filter((g) => eq(g.teamid, "GER")),
  map((g) => ({
    matchid: g.matchid,
    player: g.player,
  })),
);
query;`;
export const query = pipe(
  table("goal", {
    matchid: t.int(),
    teamid: t.string(),
    player: t.string(),
  }),
  filter((g) => eq(g.teamid, "GER")),
  map((g) => ({
    matchid: g.matchid,
    player: g.player,
  })),
);
