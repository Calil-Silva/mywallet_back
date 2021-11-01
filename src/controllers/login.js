import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import connection from '../database/database.js';

export default async function login(req, res) {
  const {
    email,
    password,
  } = req.body;

  try {
    const user = await connection
      .query('SELECT id, name, password FROM users WHERE email = $1;',
        [email]);

    if (user.rows.length === 0) {
      return res
        .status(404)
        .send({ message: 'Usuário não encontrado' });
    }

    if (bcrypt.compareSync(password, user.rows[0].password)) {
      const token = uuid();

      await connection
        .query('INSERT INTO logged_users (user_id, token) VALUES ($1, $2);',
          [user.rows[0].id, token]);

      return res.status(202).send({
        name: user.rows[0].name,
        token,
      });
    }
    return res
      .status(403)
      .send({ message: 'E-mail/senha incorretos' });
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Ocorreu um erro inesperado' });
  }
}
