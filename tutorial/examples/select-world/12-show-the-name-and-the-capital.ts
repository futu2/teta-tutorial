import {
  and,
  eq,
  filter,
  map,
  ne,
  pipe,
  substring,
  t,
  table,
} from "@teta/teta";
export const code = `import {
  and,
  eq,
  filter,
  map,
  ne,
  pipe,
  substring,
  t,
  table,
} from "@teta/teta";
const world = table("world", {
  name: t.string(),
  capital: t.string(),
});
const query = pipe(
  world,
  filter((w) =>
    and(
      eq(substring(w.name, 1, 1), substring(w.capital, 1, 1)),
      ne(w.name, w.capital),
    ),
  ),
  map((w) => ({
    name: w.name,
    capital: w.capital,
  })),
);
query;`;
export const query = pipe(
  table("world", {
    name: t.string(),
    capital: t.string(),
  }),
  filter((w) =>
    and(
      eq(substring(w.name, 1, 1), substring(w.capital, 1, 1)),
      ne(w.name, w.capital),
    ),
  ),
  map((w) => ({
    name: w.name,
    capital: w.capital,
  })),
);
