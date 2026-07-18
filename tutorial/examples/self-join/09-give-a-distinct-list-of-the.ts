import {
  and,
  dropOverlapRight,
  eq,
  filter,
  fold,
  group,
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
  fold,
  group,
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
  stopA,
  join(
    routeA,
    inner((s, r) => eq(s.stopa_id, r.a_stop), dropOverlapRight()),
  ),
  join(
    routeB,
    inner(
      (s, r) => and(eq(s.a_company, r.b_company), eq(s.a_num, r.b_num)),
      dropOverlapRight(),
    ),
  ),
  join(
    stopB,
    inner((s, sb) => eq(s.b_stop, sb.stopb_id), dropOverlapRight()),
  ),
  filter((s) => eq(s.stopa_name, "Craiglockhart")),
  fold((s) => ({
    name: group(s.stopb_name),
    company: group(s.b_company),
    num: group(s.b_num),
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
  stopA,
  join(
    routeA,
    inner((s, r) => eq(s.stopa_id, r.a_stop), dropOverlapRight()),
  ),
  join(
    routeB,
    inner(
      (s, r) => and(eq(s.a_company, r.b_company), eq(s.a_num, r.b_num)),
      dropOverlapRight(),
    ),
  ),
  join(
    stopB,
    inner((s, sb) => eq(s.b_stop, sb.stopb_id), dropOverlapRight()),
  ),
  filter((s) => eq(s.stopa_name, "Craiglockhart")),
  fold((s) => ({
    name: group(s.stopb_name),
    company: group(s.b_company),
    num: group(s.b_num),
  })),
);
