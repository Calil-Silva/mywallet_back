import connection from "../database/database.js";

async function listBalances (req, res) {
    try {
        const balances = (await connection.query('SELECT * FROM balances;')).rows
            .map(b => ({
                ...b,
                date: new Date(b.date).toLocaleDateString('pt-br'),
            }))
        res.status(200).send(balances);
    } catch (error) {
        console.log(error)
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
        console.log(error)
        res.sendStatus(500);
    }
}

export {
    listBalances,
    postBalances
};