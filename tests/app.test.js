import supertest from "supertest";
import app from "../src/app.js"
import connection from "../src/database/database.js"
import bcrypt from "bcrypt";

describe('POST /', () => {
    beforeEach(async () => {
        const user = {
            name: "Fulano",
            email: "fulano@driven.com",
            password: bcrypt.hashSync("123456", 10)
        };

        await connection.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3);", 
            [user.name, user.email, user.password]
        );
    });

<<<<<<< HEAD
    afterAll(async () => {
        await connection.query("DELETE FROM users WHERE email = $1;", ["fulano@driven.com"]);
    })

    it('Should return status 404 when user is not registered', async () => {
=======
    afterEach(async () => {
        await connection.query("DELETE FROM users WHERE email = $1;", ["fulano@driven.com"]);
    });

    it('Should return response status 404 when user is not registered', async () => {
>>>>>>> f10293641712fd8669e7e574a3c56936ee8568c7
        const user = {};
        const result = await supertest(app)
            .post("/")
            .send(user);

        expect(result.status).toEqual(404);
        expect(result.body).toEqual({message: "Usuário não encontrado"});
    });

<<<<<<< HEAD
    it('Should return status 403 when password did not match', async ()=> {
        const user = 
            {
=======
    it('Should return response status 403 when password did not match', async () => {
        const user = {
>>>>>>> f10293641712fd8669e7e574a3c56936ee8568c7
                email: "fulano@driven.com",
                password: "1234567"
            };
        const result = await supertest(app)
            .post("/")
            .send(user);

        expect(result.status).toEqual(403);
        expect(result.body).toEqual({message: "E-mail/senha incorretos"});
    });

    it('Should return response status 202 and a body (name/token), if user is registered and password matches', async () => {
        const user = {
            email: "fulano@driven.com",
            password: "123456"
        };
        const result = await supertest(app)
            .post("/")
            .send(user);

        expect(result.status).toEqual(202);
        expect(result.body).toEqual(
            {
                name: expect.any(String),
                token: expect.any(String)
            }
        )
    });
});

// describe("GET /balances", () => {

// })
