import faker from 'faker';
import bcrypt from 'bcrypt';
import connection from '../../src/database/database.js';

export const user = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(8),
  wrongPassword() {
    return this.password.slice(0, 5);
  },
  hashedPassword() {
    return bcrypt.hashSync(this.password, 10);
  },
};

export async function createUser() {
  const insertedUser = await connection.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id;',
    [user.name, user.email, user.hashedPassword()],
  );

  user.id = insertedUser.rows[0].id;

  return user;
}

export async function deleteUser() {
  await connection.query('DELETE FROM users;');
}
