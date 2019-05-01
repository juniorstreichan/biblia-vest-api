import faker from 'faker';
import User from '../../src/models/User';
import { connectMongoDBTest, disconnectMongoDBTest } from '../utils/db-utils';

describe('Suite test CRUD model User', () => {
  beforeAll(async () => {
    await connectMongoDBTest();
  });
  afterAll(async () => {
    await disconnectMongoDBTest();
  });

  const user = {
    name: faker.name.findName(),
    email: faker.internet.email().toLowerCase(),
    password: faker.internet.password(),
  };

  it('should create a new User', async () => {
    const newUser = await User.create(user);
    user._id = newUser._id;
    user.rules = newUser.rules;
    console.log('user', user);
    expect(newUser).not.toBeNull();
  });

  it('should find User by id', async () => {
    const newUser = await User.findById(user._id);
    expect(newUser).not.toBeNull();
    expect(newUser.email).toBe(user.email);
    expect(newUser.name).toBe(user.name);
    expect(newUser.rules).toEqual(expect.arrayContaining(user.rules));
  });

  it('should update User', async () => {
    const newEmail = faker.internet.email().toLowerCase();
    await User.findOneAndUpdate({ _id: user._id }, { $set: { email: newEmail.toLowerCase() } });
    const updateUser = await User.findById(user._id);
    console.log(`${newEmail} === ${updateUser.email}`);
    user.email = updateUser.email;
    expect(updateUser.email).toBe(newEmail);
  });

  it('should delete User', async () => {
    await User.findOneAndRemove({ _id: user._id });
    const deletedUser = await User.findById(user._id);

    expect(deletedUser).toBeNull();
  });
});
