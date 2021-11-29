import supertest from 'supertest';
import '../src/setup.js';
import { v4 as uuid } from 'uuid';
import app from '../src/app.js';
import connection from '../src/database/database.js';
import { createUser, deleteUser } from './fatories/userFactory.js';
import { signInUser, signOutUser } from './fatories/sessionsFactory.js';

const agent = supertest(app);

afterAll(async () => {
  connection.end();
});

describe('DELETE /signout', () => {
  beforeEach(async () => {
    await createUser();
  });

  afterEach(async () => {
    await signOutUser();
    await deleteUser();
  });

  test('Should return status code 401 if token is invalid', async () => {
    const token = uuid();

    const result = await agent
      .delete('/signout')
      .set('Authorization', `Bearer ${token}`);

    expect(result.status).toEqual(401);
  });

  test('Should return status code 200 if token is valid', async () => {
    const { token } = await signInUser();

    const result = await agent
      .delete('/signout')
      .set('Authorization', `Bearer ${token}`);

    expect(result.status).toEqual(200);
  });
});
