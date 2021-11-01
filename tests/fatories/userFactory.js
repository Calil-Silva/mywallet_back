import faker from "faker";
import bcrypt from "bcrypt";
import connection from "../../src/database/database.js";

export async function createUser() {
  const user = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: "123456",
    wrongPassword: "1234567",
    hashedPassword: bcrypt.hashSync("123456", 10),
  };

  const insertedUser = await connection.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;",
    [user.name, user.email, user.hashedPassword]
  );

  user.id = insertedUser.rows[0].id;

  return user;
}

export async function deleteUser() {
  await connection.query("DELETE FROM users;");
}
