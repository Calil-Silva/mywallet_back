import connection from "../database/database.js";

async function login(req, res) {
    const {
        name,
        password
    } = req.body;

    try {
        const user = (await connection.query('SELECT name, password FROM users WHERE name = $1 AND password = $2;', [name, password])).rows;
        if(user.length === 0) {
            return res.sendStatus(401);
        }
        res.sendStatus(202);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export {
    login
}