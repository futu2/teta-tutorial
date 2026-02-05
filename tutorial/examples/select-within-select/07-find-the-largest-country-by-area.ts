import { table, t } from "@teta/teta";

export const code = `import { table, t } from "@teta/teta";

const world = table("world", {
  name: t.string(),
  continent: t.string(),
  area: t.int(),
});

const maxArea = world
  .filter((w) => w.area.gt(0))
  .aggregate((w) => ({
    continent: w.continent.group(),
    max_area: w.area.max(),
  }));

const query = world
  .join(maxArea, (w, m) =>
    w.continent.eq(m.continent).and(w.area.eq(m.max_area))
  )
  .select((w) => ({
    continent: w.continent,
    name: w.name,
    area: w.area,
  }));

query;`;

const world = table("world", {
  name: t.string(),
  continent: t.string(),
  area: t.int(),
});

const maxArea = world
  .filter((w) => w.area.gt(0))
  .aggregate((w) => ({
    continent: w.continent.group(),
    max_area: w.area.max(),
  }));

export const query = world
  .join(maxArea, (w, m) =>
    w.continent.eq(m.continent).and(w.area.eq(m.max_area))
  )
  .select((w) => ({
    continent: w.continent,
    name: w.name,
    area: w.area,
  }));
