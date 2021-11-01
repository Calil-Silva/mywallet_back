import supertest from "supertest";
import "../src/setup.js";
import app from "../src/app.js";
import connection from "../src/database/database.js";
import { v4 as uuid } from "uuid";
import { createUser, deleteUser } from "./fatories/userFactory.js";
import { signInUser, signOutUser } from "./fatories/sessionsFactory.js";
import { newEntry } from "./fatories/entryFactory.js";

const agent = supertest(app);

describe("POST /", () => {
  beforeEach(async () => {
    await createUser();
  });

  afterEach(async () => {
    await deleteUser();
  });

  it("Should return response status 404 when user is not registered", async () => {
    const user = {};
    const result = await agent.post("/").send(user);

    expect(result.status).toEqual(404);
    expect(result.body).toEqual({ message: "Usuário não encontrado" });
  });

  it("Should return response status 403 when password did not match", async () => {
    const user = {
      email: (await createUser()).email,
      password: (await createUser()).wrongPassword,
    };
    const result = await agent.post("/").send(user);

    expect(result.status).toEqual(403);
    expect(result.body).toEqual({ message: "E-mail/senha incorretos" });
  });

  it("Should return response status 202 and a body (name/token), if user is registered and password matches", async () => {
    const user = {
      email: (await createUser()).email,
      password: (await createUser()).password,
    };
    const result = await agent.post("/").send(user);

    expect(result.status).toEqual(202);
    expect(result.body).toEqual({
      name: expect.any(String),
      token: expect.any(String),
    });
  });
});

describe("GET /balances", () => {
  beforeEach(async () => {
    await createUser();
    await signInUser();
  });

  afterEach(async () => {
    await deleteUser();
    await signOutUser();
    await connection.query("delete from balances;");
  });

  it("Should return response status 401 if user is not signed in or token is invalid", async () => {
    const fakeToken = uuid();

    const result = await agent
      .get("/balances")
      .set("Authorization", `Bearer ${fakeToken}`);

    expect(result.status).toEqual(401);
    expect(result.body).toEqual({ message: "Acesso negado!" });
  });

  it("Should return response status 200 and the list of entries", async () => {
    const { token } = await newEntry();
    const result = await agent
      .get("/balances")
      .set("Authorization", `Bearer ${token}`);

    expect(result.status).toEqual(200);
    expect(result.body[0]).toHaveProperty("description");
    expect(result.body[0]).toHaveProperty("balance");
    expect(result.body[0]).toHaveProperty("date");
  });
});
