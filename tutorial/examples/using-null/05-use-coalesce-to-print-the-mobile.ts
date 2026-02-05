import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const teacher = table("teacher", {
  name: t.string(),
  mobile: t.string(),
});

const query = teacher.select((tch) => ({
  name: tch.name,
  mobile: tch.mobile.coalesce("07986 444 2266"),
}));

query;`;

export const query = table("teacher", {
  name: t.string(),
  mobile: t.string(),
}).select((tch) => ({
  name: tch.name,
  mobile: tch.mobile.coalesce("07986 444 2266"),
}));
