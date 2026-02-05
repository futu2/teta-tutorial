import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const world = table("world", {
  name: t.string(),
});

const query = world
  .filter((w) =>
    w.name
      .like("%a%")
      .and(w.name.like("%e%"))
      .and(w.name.like("%i%"))
      .and(w.name.like("%o%"))
      .and(w.name.like("%u%"))
      .and(w.name.like("% %").not())
  )
  .select((w) => ({
    name: w.name,
  }));

query;`;

export const query = table("world", {
  name: t.string(),
})
  .filter((w) =>
    w.name
      .like("%a%")
      .and(w.name.like("%e%"))
      .and(w.name.like("%i%"))
      .and(w.name.like("%o%"))
      .and(w.name.like("%u%"))
      .and(w.name.like("% %").not())
  )
  .select((w) => ({
    name: w.name,
  }));
