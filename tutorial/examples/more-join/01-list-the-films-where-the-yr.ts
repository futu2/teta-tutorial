import { and, eq, filter, gt, map, pipe, t, table } from "@teta/teta";
export const code = `import { and, eq, filter, gt, map, pipe, t, table } from "@teta/teta";
const movie = table("movie", {
  id: t.int(),
  title: t.string(),
  yr: t.int(),
  budget: t.int(),
});
const query = pipe(
  movie,
  filter((m) => and(eq(m.yr, 1962), gt(m.budget, 2000000))),
  map((m) => ({
    id: m.id,
    title: m.title,
  })),
);
query;`;
export const query = pipe(
  table("movie", {
    id: t.int(),
    title: t.string(),
    yr: t.int(),
    budget: t.int(),
  }),
  filter((m) => and(eq(m.yr, 1962), gt(m.budget, 2000000))),
  map((m) => ({
    id: m.id,
    title: m.title,
  })),
);
