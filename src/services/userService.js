import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import * as userRepository from '../repositories/userRepository.js';
import * as sessionRepository from '../repositories/sessionRepository.js';

async function createNewSession({ email, password }) {
  const userDb = await userRepository.findUserByEmail({ email });

  if (!userDb) return [];

  const isValidPassword = bcrypt.compareSync(password, userDb.password);

  if (!isValidPassword) {
    return null;
  }

  const token = uuid();

  await sessionRepository.createSession({
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
  const isAlreadyRegistered = await userRepository.findUserByEmail({ email });

  if (isAlreadyRegistered) return null;

  const encryptedPassword = bcrypt.hashSync(password, 10);

  await userRepository.createUser({ name, email, encryptedPassword });

  return true;
}

async function signOutUser({ token }) {
  const userSession = await sessionRepository.findSessionByToken({ token });

  if (userSession) return [];

  await sessionRepository.deleteUserSession();

  return true;
}

export { createNewSession, createUser, signOutUser };
