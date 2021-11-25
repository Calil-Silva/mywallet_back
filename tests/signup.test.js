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

describe('POST /signup', () => {
  afterEach(async () => {
    await deleteUser();
  });

  it('Should return status code 406 if password did not match', async () => {
    const user = {
      name: newUser.email,
      email: newUser.email,
      password: newUser.password,
      confirmedPassword: newUser.wrongPassword,
    };

    const result = await agent.post('/signup').send(user);
    expect(result.status).toEqual(406);
    expect(result.body).toHaveProperty('message');
  });

  it('Should return status code 409 if user is already registered', async () => {
    await createUser();
    const user = {
      name: newUser.email,
      email: newUser.email,
      password: newUser.password,
      confirmedPassword: newUser.password,
    };

    const result = await agent.post('/signup').send(user);
    expect(result.status).toEqual(409);
    expect(result.body).toHaveProperty('message');
  });

  it('Should return status code 201 if user credentials are valid', async () => {
    const user = {
      name: newUser.email,
      email: newUser.email,
      password: newUser.password,
      confirmedPassword: newUser.password,
    };

    const result = await agent.post('/signup').send(user);
    expect(result.status).toEqual(201);
  });
});
