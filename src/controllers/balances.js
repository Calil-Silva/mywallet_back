import connection from "../database/database.js";
import dayjs from "dayjs";


async function listBalances (req, res) {
    const token = req.header('authorization').replace("Bearer ", "");
    try {
        const loggedUsers = (await connection.query('SELECT * FROM logged_users WHERE token = $1;', [token])).rows[0];
        if(loggedUsers.length !== 0) {
            const balances = (await connection.query('SELECT * FROM balances where user_id = $1;', [loggedUsers.user_id])).rows
            .map(b => ({
                date: dayjs(b.date).format("DD/MM"),
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

    const token = req.header('authorization').replace("Bearer ", "");

    if(!token) return res.sendStatus(401);
    if(!date || !description || !balance) return res.sendStatus(206);

    try {
        const userId = (await connection.query('SELECT user_id FROM logged_users WHERE token = $1', [token])).rows[0].user_id;
        await connection.query('INSERT INTO balances (user_id, date, description, balance) VALUES ($1, $2, $3, $4);', [userId, date, description, balance]);
        res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500);
    }
}

export {
    listBalances,
    postBalances
};