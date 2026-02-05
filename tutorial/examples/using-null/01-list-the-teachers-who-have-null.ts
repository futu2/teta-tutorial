import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const teacher = table("teacher", {
  name: t.string(),
  dept: t.int(),
});

const query = teacher
  .filter((tch) => tch.dept.isNull())
  .select((tch) => ({
    name: tch.name,
  }));

query;`;

export const query = table("teacher", {
  name: t.string(),
  dept: t.int(),
})
  .filter((tch) => tch.dept.isNull())
  .select((tch) => ({
    name: tch.name,
  }));
