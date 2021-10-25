import supertest from "supertest";
import app from "../src/app.js"
import connection from "../src/database/database.js"
import bcrypt from "bcrypt";

describe('POST /login', () => {

    afterEach(async () => {
        await connection.query("INSERT INTO users (name, email, password) VALUES ($1, $2, $3);", ["Fulano", "fulano@driven.com", "123456"]);
    })

    afterAll(async () => {
        await connection.query("DELETE FROM users WHERE email = $1;", ["fulano@driven.com"]);
    })

    it('Should return status 404 when user is not registered', async () => {
        const user = {};
        const result = await supertest(app)
            .post("/")
            .send(user);

        expect(result.status).toEqual(404);
    })

    it('Should return status 403 when password did not match', async ()=> {
        const user = 
            {
                email: "fulano@driven.com",
                password: "1234567"
            };
        const result = await supertest(app)
            .post("/")
            .send(user);

        expect(result.status).toEqual(403);
    })
})
