import jwt from 'jsonwebtoken';
import UserService from '../services/UserService';

function generateToken(user) {
  return jwt.sign({ id: user._id, rules: user.rules }, process.env.JWT_APP_SECRET, {
    expiresIn: 86400,
  });
}
class AuthController {
  async store(req, res) {
    const user = await UserService.create(req.body);
    return res.status(201).send({ user, token: generateToken(user) });
  }
}

export default new AuthController();
