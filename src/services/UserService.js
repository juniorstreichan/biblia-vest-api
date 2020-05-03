import repository from '../models/User';
import logger from '../tools/logger';

class UserService {
  async create(user) {
    logger.info(`Adding a User: ${user}`);

    const newUser = await repository.create(user);
    delete newUser.password;

    logger.info(`New User added: ${newUser}`);

    return newUser;
  }

  async findByEmail(email) {
    logger.info(`Finding User with the email: [${email}]`);
    const user = await repository.findOne({ email }).select('+password');

    logger.info(`User: [${user ? user.name : 'Not found'}]`);
    return user;
  }
}

export default new UserService();
