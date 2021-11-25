import supertest from 'supertest';
import '../src/setup.js';
import app from '../src/app.js';
import connection from '../src/database/database.js';
import {
  createUser,
  deleteUser,
  user as newUser,
} from './fatories/userFactory.js';

const agent = supertest(app);

afterAll(async () => {
  connection.end();
});

describe('POST /', () => {
  beforeEach(async () => {
    await createUser();
  });

  afterEach(async () => {
    await deleteUser();
  });

  it('Should return response status 404 when user is not registered', async () => {
    const user = {};
    const result = await agent.post('/').send(user);

    expect(result.status).toEqual(404);
    expect(result.body).toEqual({ message: 'Usuário não encontrado' });
  });

  it('Should return response status 403 when password did not match', async () => {
    const user = {
      email: newUser.email,
      password: newUser.wrongPassword(),
    };
    const result = await agent.post('/').send(user);

    expect(result.status).toEqual(403);
    expect(result.body).toEqual({ message: 'E-mail/senha incorretos' });
  });

  it('Should return response status 202 and a body (name/token), if user is registered and password matches', async () => {
    const user = {
      email: newUser.email,
      password: newUser.password,
    };
    const result = await agent.post('/').send(user);

    expect(result.status).toEqual(202);
    expect(result.body).toEqual({
      name: expect.any(String),
      token: expect.any(String),
    });
  });
});
