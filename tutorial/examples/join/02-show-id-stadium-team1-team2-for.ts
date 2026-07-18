import { eq, filter, map, pipe, t, table } from "@teta/teta";
export const code = `import { eq, filter, map, pipe, t, table } from "@teta/teta";
const game = table("game", {
  id: t.int(),
  stadium: t.string(),
  team1: t.string(),
  team2: t.string(),
});
const query = pipe(
  game,
  filter((g) => eq(g.id, 1012)),
  map((g) => ({
    id: g.id,
    stadium: g.stadium,
    team1: g.team1,
    team2: g.team2,
  })),
);
query;`;
export const query = pipe(
  table("game", {
    id: t.int(),
    stadium: t.string(),
    team1: t.string(),
    team2: t.string(),
  }),
  filter((g) => eq(g.id, 1012)),
  map((g) => ({
    id: g.id,
    stadium: g.stadium,
    team1: g.team1,
    team2: g.team2,
  })),
);
