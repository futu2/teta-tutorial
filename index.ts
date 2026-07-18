import { map, mul, pipe, t, table, toSql } from "@teta/teta";

const users = table("name", { id: t.int() });
const q1 = pipe(
  users,
  map((user) => ({ ...user, id2: mul(user.id, 2) })),
);

console.log(toSql(q1, { dialect: "postgresql", format: "compact" }));
