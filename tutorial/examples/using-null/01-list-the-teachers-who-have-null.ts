import { filter, isNull, map, pipe, t, table } from "@teta/teta";
export const code = `import { filter, isNull, map, pipe, t, table } from "@teta/teta";
const teacher = table("teacher", {
  name: t.string(),
  dept: t.int(),
});
const query = pipe(
  teacher,
  filter((tch) => isNull(tch.dept)),
  map((tch) => ({
    name: tch.name,
  })),
);
query;`;
export const query = pipe(
  table("teacher", {
    name: t.string(),
    dept: t.int(),
  }),
  filter((tch) => isNull(tch.dept)),
  map((tch) => ({
    name: tch.name,
  })),
);
