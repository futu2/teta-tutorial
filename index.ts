import { t, table } from "@teta/teta";

const q1 = table("name", {id: t.int()}).select(u => ({...u, id2: u.id.mul(2)}))
console.log(q1.toSql("Postgresql", "compact"));