import {
  dropOverlapRight,
  eq,
  filter,
  inner,
  join,
  lte,
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
  lte,
  map,
  pipe,
  t,
  table,
} from "@teta/teta";
const goal = table("goal", {
  teamid: t.string(),
  player: t.string(),
  gtime: t.int(),
});
const eteam = table("eteam", {
  id: t.string(),
  coach: t.string(),
});
const query = pipe(
  goal,
  join(
    eteam,
    inner((g, e) => eq(g.teamid, e.id), dropOverlapRight()),
  ),
  filter((g) => lte(g.gtime, 10)),
  map((g) => ({
    player: g.player,
    teamid: g.teamid,
    coach: g.coach,
    gtime: g.gtime,
  })),
);
query;`;
const goal = table("goal", {
  teamid: t.string(),
  player: t.string(),
  gtime: t.int(),
});
const eteam = table("eteam", {
  id: t.string(),
  coach: t.string(),
});
export const query = pipe(
  goal,
  join(
    eteam,
    inner((g, e) => eq(g.teamid, e.id), dropOverlapRight()),
  ),
  filter((g) => lte(g.gtime, 10)),
  map((g) => ({
    player: g.player,
    teamid: g.teamid,
    coach: g.coach,
    gtime: g.gtime,
  })),
);
