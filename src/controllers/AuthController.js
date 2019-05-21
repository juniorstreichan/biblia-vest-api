import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import messages from '../configs/messages';
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
        ? `${messages.userEmailExists}:${req.body.email}`
        : /* istanbul ignore next */ messages.httpBadRequest;
      return res.status(400).send({ message });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await UserService.findByEmail(email);

      if (!user) {
        return res.status(404).send({ message: messages.userNotFound });
      }

      if (!(await bcryptjs.compare(password, user.password))) {
        return res.status(404).send({ message: messages.userPassIncorrect });
      }
      user.password = undefined;
      return res.status(200).send({ user, token: generateToken(user) });
    } catch (error) {
      /* istanbul ignore next */
      return res.status(400).send({ message: messages.httpBadRequest });
    }
  }
}

export default new AuthController();
