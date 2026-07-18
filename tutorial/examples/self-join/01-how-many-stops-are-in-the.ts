import { count, fold, pipe, t, table } from "@teta/teta";
export const code = `import { count, fold, pipe, t, table } from "@teta/teta";
const stops = table("stops", {
  id: t.int(),
});
const query = pipe(
  stops,
  fold((s) => ({
    stop_count: count(s.id),
  })),
);
query;`;
export const query = pipe(
  table("stops", {
    id: t.int(),
  }),
  fold((s) => ({
    stop_count: count(s.id),
  })),
);
