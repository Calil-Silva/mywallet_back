import * as userServices from '../services/userServices.js';

export default async function login(req, res) {
  const { email, password } = req.body;

  try {
    const userSession = await userServices.createNewSession({
      email,
      password,
    });

    if (!userSession) {
      return res.status(403).send({ message: 'E-mail/senha incorretos' });
    }

    if (userSession.length === 0) {
      return res.status(404).send({ message: 'Usuário não encontrado' });
    }

    return res.status(202).send(userSession);
  } catch (error) {
    return res.status(500).send({ message: 'Ocorreu um erro inesperado' });
  }
}
