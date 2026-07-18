import { eq, map, or, pipe, t, table, when } from "@teta/teta";
export const code = `import { eq, map, or, pipe, t, table, when } from "@teta/teta";
const teacher = table("teacher", {
  name: t.string(),
  dept: t.int(),
});
const query = pipe(
  teacher,
  map((tch) => ({
    name: tch.name,
    faculty: when(or(eq(tch.dept, 1), eq(tch.dept, 2)), "Sci", true, "Art"),
  })),
);
query;`;
export const query = pipe(
  table("teacher", {
    name: t.string(),
    dept: t.int(),
  }),
  map((tch) => ({
    name: tch.name,
    faculty: when(or(eq(tch.dept, 1), eq(tch.dept, 2)), "Sci", true, "Art"),
  })),
);
