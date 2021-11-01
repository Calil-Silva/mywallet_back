import connection from '../database/database.js';

export default async function logoutUser(req, res) {
  const token = req.header('authorization').replace('Bearer ', '');

  try {
    const userToken = await connection.query('SELECT token FROM logged_users WHERE token = $1', [token]);
    if (userToken.rowCount > 0) {
      await connection.query('DELETE FROM logged_users WHERE token = $1;', [token]);
      return res.sendStatus(200);
    }
    res.status(401).send({ message: 'E-mail de autenticação enviado ao usuário desta conta.' });
  } catch (error) {
    res.status(500).send({ message: 'Ocorreu um erro inesperado, tente novamente mais tarde.' });
  }
}
