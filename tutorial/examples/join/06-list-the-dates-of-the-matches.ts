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
  team1: t.string(),
  mdate: t.string(),
});
const eteam = table("eteam", {
  id: t.string(),
  teamname: t.string(),
  coach: t.string(),
});
const query = pipe(
  game,
  join(
    eteam,
    inner((g, e) => eq(g.team1, e.id), dropOverlapRight()),
  ),
  filter((g) => eq(g.coach, "Fernando Santos")),
  map((g) => ({
    mdate: g.mdate,
    teamname: g.teamname,
  })),
);
query;`;
const game = table("game", {
  team1: t.string(),
  mdate: t.string(),
});
const eteam = table("eteam", {
  id: t.string(),
  teamname: t.string(),
  coach: t.string(),
});
export const query = pipe(
  game,
  join(
    eteam,
    inner((g, e) => eq(g.team1, e.id), dropOverlapRight()),
  ),
  filter((g) => eq(g.coach, "Fernando Santos")),
  map((g) => ({
    mdate: g.mdate,
    teamname: g.teamname,
  })),
);
