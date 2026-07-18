import { and, eq, filter, map, pipe, t, table } from "@teta/teta";
export const code = `import { and, eq, filter, map, pipe, t, table } from "@teta/teta";
const movie = table("movie", {
  id: t.int(),
  title: t.string(),
  yr: t.int(),
});
const query = pipe(
  movie,
  filter((m) => and(eq(m.title, "Casablanca"), eq(m.yr, 1942))),
  map((m) => ({
    id: m.id,
  })),
);
query;`;
export const query = pipe(
  table("movie", {
    id: t.int(),
    title: t.string(),
    yr: t.int(),
  }),
  filter((m) => and(eq(m.title, "Casablanca"), eq(m.yr, 1942))),
  map((m) => ({
    id: m.id,
  })),
);
