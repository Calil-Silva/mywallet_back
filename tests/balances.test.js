import supertest from 'supertest';
import '../src/setup.js';
import { v4 as uuid } from 'uuid';
import app from '../src/app.js';
import connection from '../src/database/database.js';
import { createUser, deleteUser } from './fatories/userFactory.js';
import { signInUser, signOutUser } from './fatories/sessionsFactory.js';
import newEntry from './fatories/entryFactory.js';

const agent = supertest(app);

afterAll(async () => {
  connection.end();
});

describe('GET /balances', () => {
  beforeEach(async () => {
    await createUser();
    await signInUser();
  });

  afterEach(async () => {
    await deleteUser();
    await signOutUser();
    await connection.query('delete from balances;');
  });

  it('Should return response status 401 if user is not signed in or token is invalid', async () => {
    const fakeToken = uuid();

    const result = await agent
      .get('/balances')
      .set('Authorization', `Bearer ${fakeToken}`);

    expect(result.status).toEqual(401);
    expect(result.body).toEqual({ message: 'Acesso negado, token inválido!' });
  });

  it('Should return response status 200 and the list of entries', async () => {
    const { token } = await newEntry();
    const result = await agent
      .get('/balances')
      .set('Authorization', `Bearer ${token}`);

    expect(result.status).toEqual(200);
    expect(result.body[0]).toHaveProperty('description');
    expect(result.body[0]).toHaveProperty('balance');
    expect(result.body[0]).toHaveProperty('date');
  });
});
