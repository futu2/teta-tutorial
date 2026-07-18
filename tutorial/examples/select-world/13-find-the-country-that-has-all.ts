import { and, filter, like, map, not, pipe, t, table } from "@teta/teta";
export const code = `import { and, filter, like, map, not, pipe, t, table } from "@teta/teta";
const world = table("world", {
  name: t.string(),
});
const query = pipe(
  world,
  filter((w) =>
    and(
      and(
        and(
          and(
            and(like(w.name, "%a%"), like(w.name, "%e%")),
            like(w.name, "%i%"),
          ),
          like(w.name, "%o%"),
        ),
        like(w.name, "%u%"),
      ),
      not(like(w.name, "% %")),
    ),
  ),
  map((w) => ({
    name: w.name,
  })),
);
query;`;
export const query = pipe(
  table("world", {
    name: t.string(),
  }),
  filter((w) =>
    and(
      and(
        and(
          and(
            and(like(w.name, "%a%"), like(w.name, "%e%")),
            like(w.name, "%i%"),
          ),
          like(w.name, "%o%"),
        ),
        like(w.name, "%u%"),
      ),
      not(like(w.name, "% %")),
    ),
  ),
  map((w) => ({
    name: w.name,
  })),
);
