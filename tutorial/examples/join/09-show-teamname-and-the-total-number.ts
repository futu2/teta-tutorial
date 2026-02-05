import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const eteam = table("eteam", {
  id: t.string(),
  teamname: t.string(),
});

const goal = table("goal", {
  teamid: t.string(),
});

const query = eteam
  .join(goal, (e, g) => e.id.eq(g.teamid))
  .aggregate((e) => ({
    teamname: e.teamname.group(),
    goal_count: e.teamid.count(),
  }));

query;`;

const eteam = table("eteam", {
  id: t.string(),
  teamname: t.string(),
});

const goal = table("goal", {
  teamid: t.string(),
});

export const query = eteam
  .join(goal, (e, g) => e.id.eq(g.teamid))
  .aggregate((e) => ({
    teamname: e.teamname.group(),
    goal_count: e.teamid.count(),
  }));
