import connection from '../../src/database/database';

export default async function newEntry() {
  const { id } = (await connection.query('select id from users;')).rows[0];
  const { token } = (await connection.query('select token from logged_users;'))
    .rows[0];

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
      [id, new Date().toLocaleDateString('pt-br'), 'teste', 23.95],
    )
  ).rows[0];

  return { entry, token };
}
