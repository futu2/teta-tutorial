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
const stops = table("stops", {
  id: t.int(),
  name: t.string(),
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
const stopA = pipe(
  stops,
  map((s) => ({
    stopa_id: s.id,
    stopa_name: s.name,
  })),
);
const stopB = pipe(
  stops,
  map((s) => ({
    stopb_id: s.id,
    stopb_name: s.name,
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
  join(
    stopA,
    inner((a, s) => eq(a.a_stop, s.stopa_id), dropOverlapRight()),
  ),
  join(
    stopB,
    inner((a, s) => eq(a.b_stop, s.stopb_id), dropOverlapRight()),
  ),
  filter((a) =>
    and(eq(a.stopa_name, "Craiglockhart"), eq(a.stopb_name, "London Road")),
  ),
  map((a) => ({
    company: a.a_company,
    num: a.a_num,
    stopa: a.stopa_name,
    stopb: a.stopb_name,
  })),
);
query;`;
const route = table("route", {
  company: t.string(),
  num: t.string(),
  stop: t.int(),
});
const stops = table("stops", {
  id: t.int(),
  name: t.string(),
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
const stopA = pipe(
  stops,
  map((s) => ({
    stopa_id: s.id,
    stopa_name: s.name,
  })),
);
const stopB = pipe(
  stops,
  map((s) => ({
    stopb_id: s.id,
    stopb_name: s.name,
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
  join(
    stopA,
    inner((a, s) => eq(a.a_stop, s.stopa_id), dropOverlapRight()),
  ),
  join(
    stopB,
    inner((a, s) => eq(a.b_stop, s.stopb_id), dropOverlapRight()),
  ),
  filter((a) =>
    and(eq(a.stopa_name, "Craiglockhart"), eq(a.stopb_name, "London Road")),
  ),
  map((a) => ({
    company: a.a_company,
    num: a.a_num,
    stopa: a.stopa_name,
    stopb: a.stopb_name,
  })),
);
