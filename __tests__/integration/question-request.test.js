import faker from 'faker';
import request from 'supertest';
import App from '../../src/app';
import { connectMongoDBTest, disconnectMongoDBTest } from '../utils/db-utils';

describe('JWT Token test suite', () => {
  beforeAll(async () => {
    await connectMongoDBTest();
  });
  afterAll(async () => {
    await disconnectMongoDBTest();
  });
  const user = {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
  const question = {
    description: faker.lorem.sentence(10),
    alternatives: [
      { id: 1, description: faker.lorem.sentence(3) },
      { id: 2, description: faker.lorem.sentence(3) },
      { id: 3, description: faker.lorem.sentence(3) },
      { id: 4, description: faker.lorem.sentence(3) },
    ],
    correct: 1,
    categories: [],
    active: true,
  };

  it('should create a new User from the http request', async () => {
    const response = await request(App)
      .post('/auth/create')
      .send(user);

    user.token = response.body.token;
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('user');
  });

  it('should create a new Category models from the http request', async () => {
    const response = await request(App)
      .post('/questions/categories')
      .set('Authorization', `Bearer ${user.token}`)
      .send([{ name: faker.name.jobArea() }, { name: faker.name.jobArea() }]);

    console.log('response', response.body);
    question.categories = response.body.map(cat => cat._id);
    expect(response.body).not.toBeNull();
    expect(response.body.length).toBe(2);
  });

  it('should create a new Question model from the http request', async () => {
    const response = await request(App)
      .post('/questions')
      .set('Authorization', `Bearer ${user.token}`)
      .send(question);

    expect(response.status).toBe(201);
    expect(response.body).not.toBeNull();
  });
});
