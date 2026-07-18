import {
  dropOverlapRight,
  eq,
  join,
  left,
  map,
  pipe,
  t,
  table,
} from "@teta/teta";
export const code = `import {
  dropOverlapRight,
  eq,
  join,
  left,
  map,
  pipe,
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
    left((tch, d) => eq(tch.dept, d.dept_id), dropOverlapRight()),
  ),
  map((tch) => ({
    teacher: tch.name,
    department: tch.dept_name,
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
    left((tch, d) => eq(tch.dept, d.dept_id), dropOverlapRight()),
  ),
  map((tch) => ({
    teacher: tch.name,
    department: tch.dept_name,
  })),
);
