import User from '../models/User';

class UserService {
  async create(user) {
    try {
      const newUser = await User.create(user);
      newUser.password = undefined;
      return newUser;
    } catch (error) {
      return null;
    }
  }
}

export default new UserService();
