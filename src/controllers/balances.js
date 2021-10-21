import connection from "../database/database.js";

async function listBalances (req, res) {
    const token = req.header('authorization').replace("Bearer ", "");
    try {
        const loggedUsers = (await connection.query('SELECT * FROM logged_users WHERE token = $1;', [token])).rows[0];
        if(loggedUsers.length !== 0) {
            const balances = (await connection.query('SELECT * FROM balances where user_id = $1;', [loggedUsers.user_id])).rows
            .map(b => ({
                date: new Date(b.date).toLocaleDateString('pt-br'),
                description: b.description,
                balance: b.balance
            }))
            res.status(200).send(balances);
        } else {
            res.sendStatus(401);
        }
    } catch (error) {
        res.sendStatus(500);
    }
}

async function postBalances (req, res) {
    const {
        date,
        description,
        balance 
    } = req.body;

    try {
        await connection.query('INSERT INTO balances (date, description, balance) VALUES ($1, $2, $3);', [date, description, balance]);
        res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500);
    }
}

export {
    listBalances,
    postBalances
};