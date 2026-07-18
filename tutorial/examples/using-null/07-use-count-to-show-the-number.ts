import { count, fold, pipe, t, table } from "@teta/teta";
export const code = `import { count, fold, pipe, t, table } from "@teta/teta";
const teacher = table("teacher", {
  name: t.string(),
  mobile: t.string(),
});
const query = pipe(
  teacher,
  fold((tch) => ({
    teacher_count: count(tch.name),
    mobile_count: count(tch.mobile),
  })),
);
query;`;
export const query = pipe(
  table("teacher", {
    name: t.string(),
    mobile: t.string(),
  }),
  fold((tch) => ({
    teacher_count: count(tch.name),
    mobile_count: count(tch.mobile),
  })),
);
