import connection from '../database/database.js';
import * as balanceService from '../services/balanceService.js';

async function listBalances(req, res) {
  const userId = req.locals;
  try {
    const userBalances = await balanceService.listEntries({ userId });

    return res.status(200).send(userBalances);
  } catch (error) {
    return res
      .status(500)
      .send({ message: 'Ocorreu um erro inesperado, entre novamente.' });
  }
}

async function postBalances(req, res) {
  const { date, description, balance } = req.body;

  const token = req.header('authorization').replace('Bearer ', '');

  if (!date || !description || !balance) {
    return res.status(206).send({ message: 'Preencha todos os campos.' });
  }

  try {
    const userId = (
      await connection.query(
        'SELECT user_id FROM logged_users WHERE token = $1',
        [token]
      )
    ).rows[0].user_id;
    await connection.query(
      'INSERT INTO balances (user_id, date, description, balance) VALUES ($1, $2, $3, $4);',
      [userId, date, description, balance]
    );
    return res.status(201).send({ message: 'Inserido com sucesso!' });
  } catch (error) {
    return res
      .status(500)
      .send({ message: 'Ocorreu um erro inesperado, tente novamente.' });
  }
}

export { listBalances, postBalances };
