import { signInUser } from "./sessionsFactory";
import connection from "../../src/database/database";
import dayjs from "dayjs";

export async function newEntry() {
  const id = (await connection.query("select id from users;")).rows[0].id;
  const token = (await connection.query("select token from logged_users;"))
    .rows[0].token;

  const entry = (
    await connection.query(
      `
        INSERT
            INTO balances
                (user_id, date, description, balance)
            VALUES
                ($1, $2, $3, $4)
            RETURNING balance, date, description;
    `,
      [id, new Date().toLocaleString("pt-br"), "teste", 23.95]
    )
  ).rows[0];

  return { entry, token };
}
