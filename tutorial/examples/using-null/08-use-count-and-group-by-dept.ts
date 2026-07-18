import {
  count,
  dropOverlapRight,
  eq,
  fold,
  group,
  join,
  map,
  pipe,
  right,
  t,
  table,
} from "@teta/teta";
export const code = `import {
  count,
  dropOverlapRight,
  eq,
  fold,
  group,
  join,
  map,
  pipe,
  right,
  t,
  table,
} from "@teta/teta";
const teacher = table("teacher", {
  name: t.string(),
  dept: t.int(),
});
const dept = pipe(
  table("dept", {
    id: t.int(),
    name: t.string(),
  }),
  map((d) => ({
    dept_id: d.id,
    dept_name: d.name,
  })),
);
const query = pipe(
  teacher,
  join(
    dept,
    right((tch, d) => eq(tch.dept, d.dept_id), dropOverlapRight()),
  ),
  fold((tch) => ({
    department: group(tch.dept_name),
    staff_count: count(tch.name),
  })),
);
query;`;
const teacher = table("teacher", {
  name: t.string(),
  dept: t.int(),
});
const dept = pipe(
  table("dept", {
    id: t.int(),
    name: t.string(),
  }),
  map((d) => ({
    dept_id: d.id,
    dept_name: d.name,
  })),
);
export const query = pipe(
  teacher,
  join(
    dept,
    right((tch, d) => eq(tch.dept, d.dept_id), dropOverlapRight()),
  ),
  fold((tch) => ({
    department: group(tch.dept_name),
    staff_count: count(tch.name),
  })),
);
