import faker from 'faker';
import connection from '../../src/database/database';

export async function signInUser() {
  const loggedUserData = {
    id: (await connection.query('select id from users;')).rows[0].id,
    token: faker.datatype.uuid(),
  };

  await connection.query(
    'INSERT INTO logged_users (user_id, token) VALUES ($1, $2);',
    [loggedUserData.id, loggedUserData.token],
  );

  return loggedUserData;
}

export async function signOutUser() {
  await connection.query('DELETE FROM logged_users;');
}
