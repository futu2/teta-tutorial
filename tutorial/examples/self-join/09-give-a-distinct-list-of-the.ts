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

const stopA = stops.select((s) => ({
  stopa_id: s.id,
  stopa_name: s.name,
}));

const stopB = stops.select((s) => ({
  stopb_id: s.id,
  stopb_name: s.name,
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

const query = stopA
  .join(routeA, (s, r) => s.stopa_id.eq(r.a_stop))
  .join(routeB, (s, r) => s.a_company.eq(r.b_company).and(s.a_num.eq(r.b_num)))
  .join(stopB, (s, sb) => s.b_stop.eq(sb.stopb_id))
  .filter((s) => s.stopa_name.eq("Craiglockhart"))
  .aggregate((s) => ({
    name: s.stopb_name.group(),
    company: s.b_company.group(),
    num: s.b_num.group(),
  }));

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

const stopA = stops.select((s) => ({
  stopa_id: s.id,
  stopa_name: s.name,
}));

const stopB = stops.select((s) => ({
  stopb_id: s.id,
  stopb_name: s.name,
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

export const query = stopA
  .join(routeA, (s, r) => s.stopa_id.eq(r.a_stop))
  .join(routeB, (s, r) => s.a_company.eq(r.b_company).and(s.a_num.eq(r.b_num)))
  .join(stopB, (s, sb) => s.b_stop.eq(sb.stopb_id))
  .filter((s) => s.stopa_name.eq("Craiglockhart"))
  .aggregate((s) => ({
    name: s.stopb_name.group(),
    company: s.b_company.group(),
    num: s.b_num.group(),
  }));
