import connection from '../database/database.js';
import * as userServices from '../services/userServices.js';

export default async function logoutUser(req, res) {
  const token = req.header('authorization').replace('Bearer ', '');

  try {
    const userToken = await userServices.signOutUser();
    if (userToken.length === 0) {
      res
        .status(401)
        .send({
          message: 'E-mail de autenticação enviado ao usuário desta conta.',
        });
    }
    return res.sendStatus(200);
  } catch (error) {
    res
      .status(500)
      .send({
        message: 'Ocorreu um erro inesperado, tente novamente mais tarde.',
      });
  }
}
