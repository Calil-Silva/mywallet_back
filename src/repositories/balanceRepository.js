import connection from '../database/database.js';

async function findUserBalancesByUserId({ userId }) {
  const balances = await connection.query(
    'SELECT * FROM balances where user_id = $1;',
    [userId],
  );

  return balances.rows;
}

export { findUserBalancesByUserId };
