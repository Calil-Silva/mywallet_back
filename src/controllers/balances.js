import connection from "../database/database.js";
import dayjs from "dayjs";

async function listBalances (req, res) {
    const token = req.header('authorization').replace("Bearer ", "");
    try {
        const loggedUsers = (await connection.query('SELECT * FROM logged_users WHERE token = $1;', [token])).rows;
        if(loggedUsers.length !== 0) {
            const balances = (await connection.query('SELECT * FROM balances where user_id = $1;', [loggedUsers[0].user_id])).rows
            .map(b => ({
                date: dayjs(b.date).format("DD/MM"),
                description: b.description,
                balance: b.balance
            }))
            return res.status(200).send(balances);
        } else {
            return res.status(401).send({message: "Acesso negado!"});
        }
    } catch (error) {
        return res.status(500).send({message: "Ocorreu um erro inesperado, entre novamente."});
    }
}

async function postBalances (req, res) {
    const {
        date,
        description,
        balance 
    } = req.body;

    const token = req.header('authorization').replace("Bearer ", "");

    if(!token) return res.status(401).send({message: "Acesso negado!"});
    if(!date || !description || !balance) return res.status(206).send({message: "Preencha todos os campos."});

    try {
        const userId = (await connection.query('SELECT user_id FROM logged_users WHERE token = $1', [token])).rows[0].user_id;
        await connection.query('INSERT INTO balances (user_id, date, description, balance) VALUES ($1, $2, $3, $4);', [userId, date, description, balance]);
        return res.status(201).send({message: "Inserido com sucesso!"});
    } catch (error) {
        return res.status(500).send({message: "Ocorreu um erro inesperado, tente novamente."});
    }
}

export {
    listBalances,
    postBalances
};