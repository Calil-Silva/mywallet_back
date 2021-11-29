import connection from '../database/database.js';

async function findUserByEmail({ email }) {
  const user = await connection.query('SELECT * FROM users WHERE email = $1;', [
    email,
  ]);

  return user.rows[0];
}

async function createUser({ name, email, encryptedPassword }) {
  return connection.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3);',
    [name, email, encryptedPassword],
  );
}

export { findUserByEmail, createUser };
