import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const goal = table("goal", {
  matchid: t.int(),
  teamid: t.string(),
  player: t.string(),
});

const query = goal
  .filter((g) => g.teamid.eq("GER"))
  .select((g) => ({
    matchid: g.matchid,
    player: g.player,
  }));

query;`;

export const query = table("goal", {
  matchid: t.int(),
  teamid: t.string(),
  player: t.string(),
})
  .filter((g) => g.teamid.eq("GER"))
  .select((g) => ({
    matchid: g.matchid,
    player: g.player,
  }));
