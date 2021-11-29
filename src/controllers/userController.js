import * as userService from '../services/userService.js';

async function signUp(req, res) {
  const { name, email, password, confirmedPassword } = req.body;

  if (password !== confirmedPassword) {
    return res.status(406).send({ message: 'Senha incorreta!' });
  }

  try {
    const isValidEmail = await userService.createUser({
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

async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const userSession = await userService.createNewSession({
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

async function signOut(req, res) {
  const token = req.headers.authorization?.replace('Bearer ', '');

  try {
    const userToken = await userService.signOutUser({ token });

    if (userToken.length === 0) {
      return res.status(401).send({
        message: 'E-mail de autenticação enviado ao usuário desta conta.',
      });
    }

    return res.sendStatus(200);
  } catch (error) {
    res.status(500).send({
      message: 'Ocorreu um erro inesperado, tente novamente mais tarde.',
    });
  }
}

export { signUp, signIn, signOut };
