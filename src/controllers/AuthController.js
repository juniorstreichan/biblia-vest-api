import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import UserService from '../services/UserService';

function generateToken(user) {
  return jwt.sign({ id: user._id, rules: user.rules }, process.env.JWT_APP_SECRET, {
    expiresIn: 86400,
  });
}
class AuthController {
  async store(req, res) {
    try {
      const user = await UserService.create(req.body);

      return res.status(201).send({ user, token: generateToken(user) });
    } catch (error) {
      console.log(error.message);
      const message = error.code === 11000
        ? `Já existe um usuário cadastrado com o email:${req.body.email}`
        : /* istanbul ignore next */ 'Bad request';
      return res.status(400).send({ message });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await UserService.findByEmail(email);

      if (!user) {
        return res.status(404).send({ message: 'Usuário não encontrado' });
      }

      if (!(await bcryptjs.compare(password, user.password))) {
        return res.status(404).send({ message: 'Senha inválida' });
      }
      user.password = undefined;
      return res.status(200).send({ user, token: generateToken(user) });
    } catch (error) {
      /* istanbul ignore next */
      return res.status(400).send({ message: 'Bad request' });
    }
  }
}

export default new AuthController();
