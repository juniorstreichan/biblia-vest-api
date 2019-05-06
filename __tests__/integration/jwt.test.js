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

  it('should create a new User from the http request', async () => {
    const response = await request(App)
      .post('/auth/create')
      .send(user);

    user.token = response.body.token;
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('user');
  });

  it('should http request to protected endpoint with jwt token', async () => {
    const response = await request(App)
      .post('/questions/test-jwt')
      .set('Authorization', `Bearer ${user.token}`)
      .send();

    expect(response.status).toBe(200);
  });

  it('should reject http request to protected endpoint without jwt token', async () => {
    const response = await request(App)
      .post('/questions/test-jwt')
      .send();
    console.log('response', response.body.message);

    expect(response.status).toBe(401);
  });

  it('should reject http request to protected endpoint with malformatted jwt token', async () => {
    const response = await request(App)
      .post('/questions/test-jwt')
      .set('Authorization', `Beare ${user.token}`)
      .send();
    console.log('response', response.body.message);

    expect(response.status).toBe(401);
  });

  it('should reject http request to protected endpoint with invalid jwt token', async () => {
    const response = await request(App)
      .post('/questions/test-jwt')
      .set('Authorization', 'Bearer testeee')
      .send();
    console.log('response', response.body.message);

    expect(response.status).toBe(401);
  });
});
