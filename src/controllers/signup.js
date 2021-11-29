import * as userServices from '../services/userServices.js';

export default async function signup(req, res) {
  const {
    name, email, password, confirmedPassword,
  } = req.body;

  if (password !== confirmedPassword) {
    return res.status(406).send({ message: 'Senha incorreta!' });
  }

  try {
    const isValidEmail = await userServices.createUser({
      name,
      email,
      password,
    });

    if (!isValidEmail) {
      return res.status(409).send({ message: 'Email já registrado!' });
    }

    res.sendStatus(201);
  } catch (error) {
    res.status(500).send({ message: 'Ocorreu um erro inesperado' });
  }
}
