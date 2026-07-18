import {
  and,
  asc,
  dropOverlapRight,
  eq,
  filter,
  inner,
  join,
  map,
  pipe,
  sort,
  t,
  table,
} from "@teta/teta";
export const code = `import {
  and,
  asc,
  dropOverlapRight,
  eq,
  filter,
  inner,
  join,
  map,
  pipe,
  sort,
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
const craig = pipe(
  stops,
  filter((s) => eq(s.name, "Craiglockhart")),
  map((s) => ({
    craig_id: s.id,
  })),
);
const lochend = pipe(
  stops,
  filter((s) => eq(s.name, "Lochend")),
  map((s) => ({
    lochend_id: s.id,
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
const bus1 = pipe(
  routeA,
  join(
    routeB,
    inner(
      (a, b) => and(eq(a.a_company, b.b_company), eq(a.a_num, b.b_num)),
      dropOverlapRight(),
    ),
  ),
  join(
    craig,
    inner((a, c) => eq(a.a_stop, c.craig_id), dropOverlapRight()),
  ),
  map((a) => ({
    bus1_company: a.a_company,
    bus1_num: a.a_num,
    transfer_stop: a.b_stop,
  })),
);
const bus2 = pipe(
  routeA,
  join(
    routeB,
    inner(
      (a, b) => and(eq(a.a_company, b.b_company), eq(a.a_num, b.b_num)),
      dropOverlapRight(),
    ),
  ),
  join(
    lochend,
    inner((a, l) => eq(a.a_stop, l.lochend_id), dropOverlapRight()),
  ),
  map((a) => ({
    bus2_company: a.a_company,
    bus2_num: a.a_num,
    transfer_stop: a.b_stop,
  })),
);
const transfer = pipe(
  stops,
  map((s) => ({
    stop_id: s.id,
    stop_name: s.name,
  })),
);
const query = pipe(
  bus1,
  join(
    bus2,
    inner(
      (b1, b2) => eq(b1.transfer_stop, b2.transfer_stop),
      dropOverlapRight(),
    ),
  ),
  join(
    transfer,
    inner((b1, s) => eq(b1.transfer_stop, s.stop_id), dropOverlapRight()),
  ),
  map((b1) => ({
    bus1_num: b1.bus1_num,
    bus1_company: b1.bus1_company,
    transfer: b1.stop_name,
    bus2_num: b1.bus2_num,
    bus2_company: b1.bus2_company,
  })),
  sort((b1) => [
    asc(b1.bus1_num),
    asc(b1.bus1_company),
    asc(b1.transfer),
    asc(b1.bus2_num),
    asc(b1.bus2_company),
  ]),
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
const craig = pipe(
  stops,
  filter((s) => eq(s.name, "Craiglockhart")),
  map((s) => ({
    craig_id: s.id,
  })),
);
const lochend = pipe(
  stops,
  filter((s) => eq(s.name, "Lochend")),
  map((s) => ({
    lochend_id: s.id,
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
const bus1 = pipe(
  routeA,
  join(
    routeB,
    inner(
      (a, b) => and(eq(a.a_company, b.b_company), eq(a.a_num, b.b_num)),
      dropOverlapRight(),
    ),
  ),
  join(
    craig,
    inner((a, c) => eq(a.a_stop, c.craig_id), dropOverlapRight()),
  ),
  map((a) => ({
    bus1_company: a.a_company,
    bus1_num: a.a_num,
    transfer_stop: a.b_stop,
  })),
);
const bus2 = pipe(
  routeA,
  join(
    routeB,
    inner(
      (a, b) => and(eq(a.a_company, b.b_company), eq(a.a_num, b.b_num)),
      dropOverlapRight(),
    ),
  ),
  join(
    lochend,
    inner((a, l) => eq(a.a_stop, l.lochend_id), dropOverlapRight()),
  ),
  map((a) => ({
    bus2_company: a.a_company,
    bus2_num: a.a_num,
    transfer_stop: a.b_stop,
  })),
);
const transfer = pipe(
  stops,
  map((s) => ({
    stop_id: s.id,
    stop_name: s.name,
  })),
);
export const query = pipe(
  bus1,
  join(
    bus2,
    inner(
      (b1, b2) => eq(b1.transfer_stop, b2.transfer_stop),
      dropOverlapRight(),
    ),
  ),
  join(
    transfer,
    inner((b1, s) => eq(b1.transfer_stop, s.stop_id), dropOverlapRight()),
  ),
  map((b1) => ({
    bus1_num: b1.bus1_num,
    bus1_company: b1.bus1_company,
    transfer: b1.stop_name,
    bus2_num: b1.bus2_num,
    bus2_company: b1.bus2_company,
  })),
  sort((b1) => [
    asc(b1.bus1_num),
    asc(b1.bus1_company),
    asc(b1.transfer),
    asc(b1.bus2_num),
    asc(b1.bus2_company),
  ]),
);
