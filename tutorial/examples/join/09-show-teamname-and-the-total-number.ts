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
const eteam = table("eteam", {
  id: t.string(),
  teamname: t.string(),
});
const goal = table("goal", {
  teamid: t.string(),
});
const query = pipe(
  eteam,
  join(
    goal,
    inner((e, g) => eq(e.id, g.teamid), dropOverlapRight()),
  ),
  fold((e) => ({
    teamname: group(e.teamname),
    goal_count: count(e.teamid),
  })),
);
query;`;
const eteam = table("eteam", {
  id: t.string(),
  teamname: t.string(),
});
const goal = table("goal", {
  teamid: t.string(),
});
export const query = pipe(
  eteam,
  join(
    goal,
    inner((e, g) => eq(e.id, g.teamid), dropOverlapRight()),
  ),
  fold((e) => ({
    teamname: group(e.teamname),
    goal_count: count(e.teamid),
  })),
);
