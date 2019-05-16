import Repository from '../models/User';

class UserService {
  async create(user) {
    const newUser = await Repository.create(user);
    newUser.password = undefined;
    return newUser;
  }

  async findByEmail(email) {
    const user = await Repository.findOne({ email }).select('+password');

    return user;
  }
}

export default new UserService();
