import { count, eq, filter, fold, group, or, pipe, t, table } from "@teta/teta";
export const code = `import { count, eq, filter, fold, group, or, pipe, t, table } from "@teta/teta";
const route = table("route", {
  company: t.string(),
  num: t.string(),
  stop: t.int(),
});
const query = pipe(
  route,
  filter((r) => or(eq(r.stop, 149), eq(r.stop, 53))),
  fold((r) => ({
    company: group(r.company),
    num: group(r.num),
    stop_count: count(r.stop),
  })),
  filter((r) => eq(r.stop_count, 2)),
);
query;`;
export const query = pipe(
  table("route", {
    company: t.string(),
    num: t.string(),
    stop: t.int(),
  }),
  filter((r) => or(eq(r.stop, 149), eq(r.stop, 53))),
  fold((r) => ({
    company: group(r.company),
    num: group(r.num),
    stop_count: count(r.stop),
  })),
  filter((r) => eq(r.stop_count, 2)),
);
