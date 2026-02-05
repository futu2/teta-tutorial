import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const goal = table("goal", {
  teamid: t.string(),
  player: t.string(),
  gtime: t.int(),
});

const eteam = table("eteam", {
  id: t.string(),
  coach: t.string(),
});

const query = goal
  .join(eteam, (g, e) => g.teamid.eq(e.id))
  .filter((g) => g.gtime.lte(10))
  .select((g) => ({
    player: g.player,
    teamid: g.teamid,
    coach: g.coach,
    gtime: g.gtime,
  }));

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

export const query = goal
  .join(eteam, (g, e) => g.teamid.eq(e.id))
  .filter((g) => g.gtime.lte(10))
  .select((g) => ({
    player: g.player,
    teamid: g.teamid,
    coach: g.coach,
    gtime: g.gtime,
  }));
