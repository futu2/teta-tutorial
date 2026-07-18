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
const route = table("route", {
  company: t.string(),
  num: t.string(),
  stop: t.int(),
});
const routeA = pipe(
  route,
  map((r) => ({
    a_company: r.company,
    a_num: r.num,
    a_stop: r.stop,
  })),
);
const routeB = pipe(
  route,
  map((r) => ({
    b_company: r.company,
    b_num: r.num,
    b_stop: r.stop,
  })),
);
const query = pipe(
  routeA,
  join(
    routeB,
    inner(
      (a, b) => and(eq(a.a_company, b.b_company), eq(a.a_num, b.b_num)),
      dropOverlapRight(),
    ),
  ),
  filter((a) => and(eq(a.a_stop, 53), eq(a.b_stop, 149))),
  map((a) => ({
    company: a.a_company,
    num: a.a_num,
    from_stop: a.a_stop,
    to_stop: a.b_stop,
  })),
);
query;`;
const route = table("route", {
  company: t.string(),
  num: t.string(),
  stop: t.int(),
});
const routeA = pipe(
  route,
  map((r) => ({
    a_company: r.company,
    a_num: r.num,
    a_stop: r.stop,
  })),
);
const routeB = pipe(
  route,
  map((r) => ({
    b_company: r.company,
    b_num: r.num,
    b_stop: r.stop,
  })),
);
export const query = pipe(
  routeA,
  join(
    routeB,
    inner(
      (a, b) => and(eq(a.a_company, b.b_company), eq(a.a_num, b.b_num)),
      dropOverlapRight(),
    ),
  ),
  filter((a) => and(eq(a.a_stop, 53), eq(a.b_stop, 149))),
  map((a) => ({
    company: a.a_company,
    num: a.a_num,
    from_stop: a.a_stop,
    to_stop: a.b_stop,
  })),
);
