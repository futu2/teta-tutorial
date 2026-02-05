import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const route = table("route", {
  company: t.string(),
  num: t.string(),
  stop: t.int(),
});

const query = route
  .filter((r) => r.stop.eq(149).or(r.stop.eq(53)))
  .aggregate((r) => ({
    company: r.company.group(),
    num: r.num.group(),
    stop_count: r.stop.count(),
  }))
  .filter((r) => r.stop_count.eq(2));

query;`;

export const query = table("route", {
  company: t.string(),
  num: t.string(),
  stop: t.int(),
})
  .filter((r) => r.stop.eq(149).or(r.stop.eq(53)))
  .aggregate((r) => ({
    company: r.company.group(),
    num: r.num.group(),
    stop_count: r.stop.count(),
  }))
  .filter((r) => r.stop_count.eq(2));
