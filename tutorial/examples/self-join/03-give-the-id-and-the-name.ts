import {
  and,
  dropOverlapRight,
  eq,
  filter,
  inner,
  join,
  map,
  pipe,
  t,
  table,
} from "@teta/teta";
export const code = `import {
  and,
  dropOverlapRight,
  eq,
  filter,
  inner,
  join,
  map,
  pipe,
  t,
  table,
} from "@teta/teta";
const stops = table("stops", {
  id: t.int(),
  name: t.string(),
});
const route = table("route", {
  company: t.string(),
  num: t.string(),
  stop: t.int(),
});
const query = pipe(
  stops,
  join(
    route,
    inner((s, r) => eq(s.id, r.stop), dropOverlapRight()),
  ),
  filter((s) => and(eq(s.company, "LRT"), eq(s.num, "4"))),
  map((s) => ({
    id: s.id,
    name: s.name,
  })),
);
query;`;
const stops = table("stops", {
  id: t.int(),
  name: t.string(),
});
const route = table("route", {
  company: t.string(),
  num: t.string(),
  stop: t.int(),
});
export const query = pipe(
  stops,
  join(
    route,
    inner((s, r) => eq(s.id, r.stop), dropOverlapRight()),
  ),
  filter((s) => and(eq(s.company, "LRT"), eq(s.num, "4"))),
  map((s) => ({
    id: s.id,
    name: s.name,
  })),
);
