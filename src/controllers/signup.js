import connection from "../database/database";

async function signup (req, res) {
    const {
        name,
        email,
        password,
        confirmedPassword
    } = req.body;

    if (password !== confirmedPassword) return res.sendStatus(406);

    try {
        const usersEmails = (await connection.query('SELECT email FROM users')).rows.map(user => user.email);
        if (usersEmails.includes(email)) return res.sendStatus(409);

        await connection.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3);', [name, email, password])
    } catch (error) {
        res.sendStatus(500);
    }
}

export {
    signup
}