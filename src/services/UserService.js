import User from '../models/User';

class UserService {
  async create(user) {
    const newUser = await User.create(user);
    newUser.password = undefined;
    return newUser;
  }

  async findByEmail(email) {
    const user = await User.findOne({ email }).select('+password');

    return user;
  }
}

export default new UserService();
