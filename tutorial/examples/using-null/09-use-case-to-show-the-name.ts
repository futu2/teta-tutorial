import { table, t, when } from "@teta/teta";

export const code = `import { table, t, when } from "@teta/teta";

const teacher = table("teacher", {
  name: t.string(),
  dept: t.int(),
});

const query = teacher.select((tch) => ({
  name: tch.name,
  faculty: when(tch.dept.eq(1).or(tch.dept.eq(2)), "Sci").else("Art"),
}));

query;`;

export const query = table("teacher", {
  name: t.string(),
  dept: t.int(),
}).select((tch) => ({
  name: tch.name,
  faculty: when(tch.dept.eq(1).or(tch.dept.eq(2)), "Sci").else("Art"),
}));
