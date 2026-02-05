import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const movie = table("movie", {
  title: t.string(),
  yr: t.int(),
});

const query = movie
  .filter((m) => m.title.eq("Citizen Kane"))
  .select((m) => ({
    yr: m.yr,
  }));

query;`;

export const query = table("movie", {
  title: t.string(),
  yr: t.int(),
})
  .filter((m) => m.title.eq("Citizen Kane"))
  .select((m) => ({
    yr: m.yr,
  }));
