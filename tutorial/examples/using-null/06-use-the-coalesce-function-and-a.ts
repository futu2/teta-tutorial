import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const teacher = table("teacher", {
  name: t.string(),
  dept: t.int(),
});

const dept = table("dept", {
  id: t.int(),
  name: t.string(),
}).select((d) => ({
  dept_id: d.id,
  dept_name: d.name,
}));

const query = teacher
  .leftJoin(dept, (tch, d) => tch.dept.eq(d.dept_id))
  .select((tch) => ({
    name: tch.name,
    department: tch.dept_name.coalesce("None"),
  }));

query;`;

const teacher = table("teacher", {
  name: t.string(),
  dept: t.int(),
});

const dept = table("dept", {
  id: t.int(),
  name: t.string(),
}).select((d) => ({
  dept_id: d.id,
  dept_name: d.name,
}));

export const query = teacher
  .leftJoin(dept, (tch, d) => tch.dept.eq(d.dept_id))
  .select((tch) => ({
    name: tch.name,
    department: tch.dept_name.coalesce("None"),
  }));
