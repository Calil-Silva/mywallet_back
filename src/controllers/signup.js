import bcrypt from 'bcrypt';
import connection from '../database/database.js';

export default async function signup(req, res) {
  const {
    name, email, password, confirmedPassword,
  } = req.body;

  if (password !== confirmedPassword) {
    return res.status(406).send({ message: 'Senha incorreta!' });
  }

  try {
    const usersEmails = await connection.query(
      'SELECT * FROM users WHERE email = $1;',
      [email],
    );
    if (usersEmails.rowCount !== 0) {
      return res.status(409).send({ message: 'Email já registrado!' });
    }
    const encryptedPassword = bcrypt.hashSync(password, 10);
    await connection.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3);',
      [name, email, encryptedPassword],
    );
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send({ message: 'Ocorreu um erro inesperado' });
  }
}
