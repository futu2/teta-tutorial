import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const route = table("route", {
  company: t.string(),
  num: t.string(),
  stop: t.int(),
});

const stops = table("stops", {
  id: t.int(),
  name: t.string(),
});

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

const stopA = stops.select((s) => ({
  stopa_id: s.id,
  stopa_name: s.name,
}));

const stopB = stops.select((s) => ({
  stopb_id: s.id,
  stopb_name: s.name,
}));

const query = routeA
  .join(routeB, (a, b) => a.a_company.eq(b.b_company).and(a.a_num.eq(b.b_num)))
  .join(stopA, (a, s) => a.a_stop.eq(s.stopa_id))
  .join(stopB, (a, s) => a.b_stop.eq(s.stopb_id))
  .filter((a) =>
    a.stopa_name.eq("Craiglockhart").and(a.stopb_name.eq("Tollcross"))
  )
  .aggregate((a) => ({
    company: a.a_company.group(),
    num: a.a_num.group(),
  }));

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

const stopA = stops.select((s) => ({
  stopa_id: s.id,
  stopa_name: s.name,
}));

const stopB = stops.select((s) => ({
  stopb_id: s.id,
  stopb_name: s.name,
}));

export const query = routeA
  .join(routeB, (a, b) => a.a_company.eq(b.b_company).and(a.a_num.eq(b.b_num)))
  .join(stopA, (a, s) => a.a_stop.eq(s.stopa_id))
  .join(stopB, (a, s) => a.b_stop.eq(s.stopb_id))
  .filter((a) =>
    a.stopa_name.eq("Craiglockhart").and(a.stopb_name.eq("Tollcross"))
  )
  .aggregate((a) => ({
    company: a.a_company.group(),
    num: a.a_num.group(),
  }));
