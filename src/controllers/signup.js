import connection from "../database/database.js";
import bcrypt from 'bcrypt';

async function signup (req, res) {
    const {
        name,
        email,
        password,
        confirmedPassword
    } = req.body;

    if (password !== confirmedPassword) return res.sendStatus(406);

    try {
        const usersEmails = (await connection.query('SELECT email FROM users')).rows.map(({email}) => email);
        if (usersEmails.includes(email)) return res.sendStatus(409);
        const encryptedPassword = bcrypt.hashSync(password, 10);
        await connection.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3);', [name, email, encryptedPassword]);
        res.sendStatus(201);
    } catch (error) {
        res.sendStatus(500);
    }
}

export {
    signup
}