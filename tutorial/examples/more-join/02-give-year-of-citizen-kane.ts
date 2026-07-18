import { eq, filter, map, pipe, t, table } from "@teta/teta";
export const code = `import { eq, filter, map, pipe, t, table } from "@teta/teta";
const movie = table("movie", {
  title: t.string(),
  yr: t.int(),
});
const query = pipe(
  movie,
  filter((m) => eq(m.title, "Citizen Kane")),
  map((m) => ({
    yr: m.yr,
  })),
);
query;`;
export const query = pipe(
  table("movie", {
    title: t.string(),
    yr: t.int(),
  }),
  filter((m) => eq(m.title, "Citizen Kane")),
  map((m) => ({
    yr: m.yr,
  })),
);
