import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const route = table("route", {
  company: t.string(),
  num: t.string(),
  stop: t.int(),
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

const query = routeA
  .join(routeB, (a, b) => a.a_company.eq(b.b_company).and(a.a_num.eq(b.b_num)))
  .filter((a) => a.a_stop.eq(53).and(a.b_stop.eq(149)))
  .select((a) => ({
    company: a.a_company,
    num: a.a_num,
    from_stop: a.a_stop,
    to_stop: a.b_stop,
  }));

query;`;

const route = table("route", {
  company: t.string(),
  num: t.string(),
  stop: t.int(),
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

export const query = routeA
  .join(routeB, (a, b) => a.a_company.eq(b.b_company).and(a.a_num.eq(b.b_num)))
  .filter((a) => a.a_stop.eq(53).and(a.b_stop.eq(149)))
  .select((a) => ({
    company: a.a_company,
    num: a.a_num,
    from_stop: a.a_stop,
    to_stop: a.b_stop,
  }));
