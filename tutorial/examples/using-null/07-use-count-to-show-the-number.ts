import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const teacher = table("teacher", {
  name: t.string(),
  mobile: t.string(),
});

const query = teacher.aggregate((tch) => ({
  teacher_count: tch.name.count(),
  mobile_count: tch.mobile.count(),
}));

query;`;

export const query = table("teacher", {
  name: t.string(),
  mobile: t.string(),
}).aggregate((tch) => ({
  teacher_count: tch.name.count(),
  mobile_count: tch.mobile.count(),
}));
