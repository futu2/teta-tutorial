import { coalesce, map, pipe, t, table } from "@teta/teta";
export const code = `import { coalesce, map, pipe, t, table } from "@teta/teta";
const teacher = table("teacher", {
  name: t.string(),
  mobile: t.string(),
});
const query = pipe(
  teacher,
  map((tch) => ({
    name: tch.name,
    mobile: coalesce(tch.mobile, "07986 444 2266"),
  })),
);
query;`;
export const query = pipe(
  table("teacher", {
    name: t.string(),
    mobile: t.string(),
  }),
  map((tch) => ({
    name: tch.name,
    mobile: coalesce(tch.mobile, "07986 444 2266"),
  })),
);
