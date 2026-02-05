import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const stops = table("stops", {
  id: t.int(),
  name: t.string(),
});

const route = table("route", {
  company: t.string(),
  num: t.string(),
  stop: t.int(),
});

const craig = stops
  .filter((s) => s.name.eq("Craiglockhart"))
  .select((s) => ({
    craig_id: s.id,
  }));

const lochend = stops
  .filter((s) => s.name.eq("Lochend"))
  .select((s) => ({
    lochend_id: s.id,
  }));

const routeA = route.select((r) => ({
  a_company: r.company,
  a_num: r.num,
  a_stop: r.stop,
}));

const routeB = route.select((r) => ({
  b_company: r.company,
  b_num: r.num,
  b_stop: r.stop,
}));

const bus1 = routeA
  .join(routeB, (a, b) => a.a_company.eq(b.b_company).and(a.a_num.eq(b.b_num)))
  .join(craig, (a, c) => a.a_stop.eq(c.craig_id))
  .select((a) => ({
    bus1_company: a.a_company,
    bus1_num: a.a_num,
    transfer_stop: a.b_stop,
  }));

const bus2 = routeA
  .join(routeB, (a, b) => a.a_company.eq(b.b_company).and(a.a_num.eq(b.b_num)))
  .join(lochend, (a, l) => a.a_stop.eq(l.lochend_id))
  .select((a) => ({
    bus2_company: a.a_company,
    bus2_num: a.a_num,
    transfer_stop: a.b_stop,
  }));

const transfer = stops.select((s) => ({
  stop_id: s.id,
  stop_name: s.name,
}));

const query = bus1
  .join(bus2, (b1, b2) => b1.transfer_stop.eq(b2.transfer_stop))
  .join(transfer, (b1, s) => b1.transfer_stop.eq(s.stop_id))
  .select((b1) => ({
    bus1_num: b1.bus1_num,
    bus1_company: b1.bus1_company,
    transfer: b1.stop_name,
    bus2_num: b1.bus2_num,
    bus2_company: b1.bus2_company,
  }))
  .orderBy((b1) => [
    b1.bus1_num.asc(),
    b1.bus1_company.asc(),
    b1.transfer.asc(),
    b1.bus2_num.asc(),
    b1.bus2_company.asc(),
  ]);

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

const craig = stops
  .filter((s) => s.name.eq("Craiglockhart"))
  .select((s) => ({
    craig_id: s.id,
  }));

const lochend = stops
  .filter((s) => s.name.eq("Lochend"))
  .select((s) => ({
    lochend_id: s.id,
  }));

const routeA = route.select((r) => ({
  a_company: r.company,
  a_num: r.num,
  a_stop: r.stop,
}));

const routeB = route.select((r) => ({
  b_company: r.company,
  b_num: r.num,
  b_stop: r.stop,
}));

const bus1 = routeA
  .join(routeB, (a, b) => a.a_company.eq(b.b_company).and(a.a_num.eq(b.b_num)))
  .join(craig, (a, c) => a.a_stop.eq(c.craig_id))
  .select((a) => ({
    bus1_company: a.a_company,
    bus1_num: a.a_num,
    transfer_stop: a.b_stop,
  }));

const bus2 = routeA
  .join(routeB, (a, b) => a.a_company.eq(b.b_company).and(a.a_num.eq(b.b_num)))
  .join(lochend, (a, l) => a.a_stop.eq(l.lochend_id))
  .select((a) => ({
    bus2_company: a.a_company,
    bus2_num: a.a_num,
    transfer_stop: a.b_stop,
  }));

const transfer = stops.select((s) => ({
  stop_id: s.id,
  stop_name: s.name,
}));

export const query = bus1
  .join(bus2, (b1, b2) => b1.transfer_stop.eq(b2.transfer_stop))
  .join(transfer, (b1, s) => b1.transfer_stop.eq(s.stop_id))
  .select((b1) => ({
    bus1_num: b1.bus1_num,
    bus1_company: b1.bus1_company,
    transfer: b1.stop_name,
    bus2_num: b1.bus2_num,
    bus2_company: b1.bus2_company,
  }))
  .orderBy((b1) => [
    b1.bus1_num.asc(),
    b1.bus1_company.asc(),
    b1.transfer.asc(),
    b1.bus2_num.asc(),
    b1.bus2_company.asc(),
  ]);
