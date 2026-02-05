import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const game = table("game", {
  team1: t.string(),
  mdate: t.string(),
});

const eteam = table("eteam", {
  id: t.string(),
  teamname: t.string(),
  coach: t.string(),
});

const query = game
  .join(eteam, (g, e) => g.team1.eq(e.id))
  .filter((g) => g.coach.eq("Fernando Santos"))
  .select((g) => ({
    mdate: g.mdate,
    teamname: g.teamname,
  }));

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

export const query = game
  .join(eteam, (g, e) => g.team1.eq(e.id))
  .filter((g) => g.coach.eq("Fernando Santos"))
  .select((g) => ({
    mdate: g.mdate,
    teamname: g.teamname,
  }));
