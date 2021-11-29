import connection from '../database/database.js';

async function findUserByEmail({ email }) {
  const user = await connection.query('SELECT * FROM users WHERE email = $1;', [
    email,
  ]);

  return user.rows[0];
}

async function createSession({ userId, token }) {
  const newSession = await connection.query(
    'INSERT INTO logged_users (user_id, token) VALUES ($1, $2) RETURNING user_id, token;',
    [userId, token],
  );

  return newSession.rows[0];
}

async function createUser({ name, email, encryptedPassword }) {
  return connection.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3);',
    [name, email, encryptedPassword],
  );
}

async function findSessionByToken({token}) {
  const userToken = await connection.query('SELECT token FROM logged_users WHERE token = $1', [token]);

  return userToken.rows[0];
}

async function deleteUserSession({token}) {
  return connection.query('DELETE FROM logged_users WHERE token = $1;', [token]);
}

export { findUserByEmail, createSession, createUser };
