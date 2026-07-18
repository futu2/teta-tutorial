import { asc, filter, like, map, pipe, sort, t, table } from "@teta/teta";
export const code = `import { asc, filter, like, map, pipe, sort, t, table } from "@teta/teta";
const movie = table("movie", {
  id: t.int(),
  title: t.string(),
  yr: t.int(),
});
const query = pipe(
  movie,
  filter((m) => like(m.title, "Star Trek%")),
  map((m) => ({
    id: m.id,
    title: m.title,
    yr: m.yr,
  })),
  sort((m) => asc(m.yr)),
);
query;`;
export const query = pipe(
  table("movie", {
    id: t.int(),
    title: t.string(),
    yr: t.int(),
  }),
  filter((m) => like(m.title, "Star Trek%")),
  map((m) => ({
    id: m.id,
    title: m.title,
    yr: m.yr,
  })),
  sort((m) => asc(m.yr)),
);
