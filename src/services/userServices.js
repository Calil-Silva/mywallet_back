import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import * as userRepositories from '../repositories/userRepositories.js';

async function createNewSession({ email, password }) {
  const userDb = await userRepositories.findUserByEmail({ email });

  if (!userDb) return [];

  const isValidPassword = bcrypt.compareSync(password, userDb.password);

  if (!isValidPassword) {
    return null;
  }

  const token = uuid();

  await userRepositories.createSession({
    userId: userDb.id,
    token,
  });

  const credentials = {
    name: userDb.name,
    token,
  };

  return credentials;
}

async function createUser({ name, email, password }) {
  const isAlreadyRegistered = await userRepositories.findUserByEmail({ email });

  if (isAlreadyRegistered) return null;

  const encryptedPassword = bcrypt.hashSync(password, 10);

  await userRepositories.createUser({ name, email, encryptedPassword });

  return true;
}

export { createNewSession, createUser };
