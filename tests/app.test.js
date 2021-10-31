import supertest from "supertest";
import "../src/setup.js";
import app from "../src/app.js";
import connection from "../src/database/database.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

describe("POST /", () => {
  beforeEach(async () => {
    const user = {
      name: "Fulano",
      email: "fulano@driven.com",
      password: bcrypt.hashSync("123456", 10),
    };

    await connection.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3);",
      [user.name, user.email, user.password]
    );
  });

  afterEach(async () => {
    await connection.query("DELETE FROM users WHERE email = $1;", [
      "fulano@driven.com",
    ]);
  });

  it("Should return response status 404 when user is not registered", async () => {
    const user = {};
    const result = await supertest(app).post("/").send(user);

    expect(result.status).toEqual(404);
    expect(result.body).toEqual({ message: "Usuário não encontrado" });
  });

  it("Should return response status 403 when password did not match", async () => {
    const user = {
      email: "fulano@driven.com",
      password: "1234567",
    };
    const result = await supertest(app).post("/").send(user);

    expect(result.status).toEqual(403);
    expect(result.body).toEqual({ message: "E-mail/senha incorretos" });
  });

  it("Should return response status 202 and a body (name/token), if user is registered and password matches", async () => {
    const user = {
      email: "fulano@driven.com",
      password: "123456",
    };
    const result = await supertest(app).post("/").send(user);

    expect(result.status).toEqual(202);
    expect(result.body).toEqual({
      name: expect.any(String),
      token: expect.any(String),
    });
  });
});

describe("GET /balances", () => {
  beforeEach(async () => {
    const user = {
      name: "Fulano",
      email: "fulano@driven.com",
      password: bcrypt.hashSync("123456", 10),
    };

    await connection.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3);",
      [user.name, user.email, user.password]
    );

    const userId = (
      await connection.query("SELECT id FROM users WHERE email = $1;", [
        user.email,
      ])
    ).rows[0].id;

    await connection.query(
      "INSERT INTO logged_users (user_id, token) VALUES ($1, $2);",
      [userId, uuid()]
    );
  });

  afterEach(async () => {
    await connection.query("DELETE FROM users;");
    await connection.query("DELETE FROM logged_users;");
  });

  it("Should return response status 401 if user is not signed in or token is invalid", async () => {
    const fakeToken = uuid();

    const result = await supertest(app)
      .get("/balances")
      .set("Authorization", `Bearer ${fakeToken}`);

    expect(result.status).toEqual(401);
    expect(result.body).toEqual({ message: "Acesso negado!" });
  });

  it("Should return response status 200 and the list of entries", async () => {
    const user = {
      email: "fulano@driven.com",
      password: "123456",
    };
    const loggedUserData = await connection.query(
      `SELECT
                logged_users.user_id,
                logged_users.token 
             FROM 
                logged_users
             JOIN
                users ON logged_users.user_id = users.id
             WHERE
                users.email = $1;
            `,
      [user.email]
    );
    const id = loggedUserData.rows[0].user_id;
    const token = loggedUserData.rows[0].token;
    const entries = (
      await connection.query("SELECT * FROM balances WHERE user_id = $1;", [id])
    ).rows;

    const result = await supertest(app)
      .get("/balances")
      .set("Authorization", `Bearer ${token}`);

    expect(result.status).toEqual(200);
    expect(result.body).toEqual(entries);
  });
});
