import connection from '../database/database.js';

export default async function authentication(req, res, next) {
  const token = req?.header('authorization')?.replace('Bearer ', '');

  try {
    if (!token) {
      return res.status(400).send({ message: 'Insira um token' });
    }

    const findLoggedUser = await connection.query(
      'SELECT * FROM logged_users WHERE token = $1;',
      [token],
    );

    if (findLoggedUser.rowCount === 0) {
      return res
        .status(401)
        .send({ message: 'Acesso negado, token inválido!' });
    }

    next();
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Ocorreu um erro inesperado, entre novamente.' });
  }
}
