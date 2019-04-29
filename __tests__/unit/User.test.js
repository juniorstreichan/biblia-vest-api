import { connectMongoDBTest, disconnectMongoDBTest } from '../db-utils';
import faker from 'faker'
import User from '../../src/models/User'
jest.setTimeout(600000);

beforeAll(async () => {
 await connectMongoDBTest();
});

afterAll(async () => {
  await disconnectMongoDBTest();
});

describe('Suite test CRUD model User', () => {
  let user = {
      name:faker.name.findName(),
      email:faker.internet.email(),
      password:faker.internet.password()
  };
  it('should create a new User', async () => {

    user = await User.create(user);

    console.log('user', user)
    
    expect(user).not.toBeNull();
  
  });

  it('should find User by id',async () => {
    const newUser = await User.findById(user._id);
    expect(newUser).not.toBeNull();
    expect(newUser.email).toBe(user.email);
    expect(newUser.name).toBe(user.name);
    expect(newUser.rules).toEqual(expect.arrayContaining(user.rules));
  });

  it('should update User', async() => {
    const newEmail = faker.internet.email().toLowerCase();
     await User.findByIdAndUpdate(user._id,{$set:{email:newEmail}});
     const {email:updateEmail} =await User.findById(user._id);
    console.log(newEmail, updateEmail)

    expect(updateEmail).toBe(newEmail);
 
  });

  it('should delete User', async() => {

     await User.findByIdAndRemove(user._id);
     const deletedUser =await User.findById(user._id);
    

    expect(deletedUser).toBeNull();
 
  });
});
