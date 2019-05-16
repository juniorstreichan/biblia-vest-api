import request from 'supertest';
import App from '../../src/app';
import { connectMongoDBTest, disconnectMongoDBTest } from '../utils/db-utils';
import { generateUser } from '../utils/mock-data';

describe('Authentication test Suite', () => {
  beforeAll(async () => {
    await connectMongoDBTest();
  });
  afterAll(async () => {
    await disconnectMongoDBTest();
  });
  const user = generateUser();

  it('should create a new User from the http request', async () => {
    const response = await request(App)
      .post('/auth/create')
      .send(user);

    console.log('response', response.body);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('user');
  });

  it('should reject a new User from the http request with email repeted', async () => {
    const response = await request(App)
      .post('/auth/create')
      .send(user);

    console.log('response', response.body.message);
    expect(response.status).toBe(400);
  });

  it('should reject a new User invalid from the http request', async () => {
    const response = await request(App)
      .post('/auth/create')
      .send({
        name: 'teste',
        email: 'teste',
        password: '123456789',
      });

    console.log('response', response.body.message);
    expect(response.status).toBe(422);
  });

  it('should reject a new User with invalid name from the http request', async () => {
    const response = await request(App)
      .post('/auth/create')
      .send({ ...user, name: '' });

    console.log('response', response.body.message);
    expect(response.status).toBe(422);
  });

  it('should reject a new User with invalid email from the http request', async () => {
    const response = await request(App)
      .post('/auth/create')
      .send({ ...user, email: 'teste' });

    console.log('response', response.body.message);
    expect(response.status).toBe(422);
  });

  it('should reject a new User without email from the http request', async () => {
    const response = await request(App)
      .post('/auth/create')
      .send({ ...user, email: '' });

    console.log('response', response.body.message);
    expect(response.status).toBe(422);
  });

  it('should reject a new User with invalid password from the http request', async () => {
    const response = await request(App)
      .post('/auth/create')
      .send({ ...user, password: '123' });

    console.log('response', response.body.message);
    expect(response.status).toBe(422);
  });
  it('should reject a new User without password from the http request', async () => {
    const response = await request(App)
      .post('/auth/create')
      .send({ ...user, password: '' });

    console.log('response', response.body.message);
    expect(response.status).toBe(422);
  });

  it('should reject a no body http request', async () => {
    const response = await request(App)
      .post('/auth/create')
      .send(null);

    console.log('response', response.body.message);
    expect(response.status).toBe(400);
  });

  it('should login successfull', async () => {
    const response = await request(App)
      .post('/auth')
      .send(user);

    console.log('response', response.body);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('user');
  });

  it('should not do login without request body', async () => {
    const response = await request(App)
      .post('/auth')
      .send(null);

    console.log('response', response.body.message);
    expect(response.status).toBe(400);
  });

  it('should not do login without email', async () => {
    const response = await request(App)
      .post('/auth')
      .send({ ...user, email: '' });

    console.log('response', response.body.message);
    expect(response.status).toBe(422);
  });

  it('should not do login with invalid email ', async () => {
    const response = await request(App)
      .post('/auth')
      .send({ ...user, email: 'teste' });

    console.log('response', response.body.message);
    expect(response.status).toBe(422);
  });

  it('should not do login with email not found', async () => {
    const response = await request(App)
      .post('/auth')
      .send({ ...user, email: 'teste@hotmail.com' });

    console.log('response', response.body.message);
    expect(response.status).toBe(404);
  });

  it('should not do login without password', async () => {
    const response = await request(App)
      .post('/auth')
      .send({ ...user, password: '' });

    console.log('response', response.body.message);
    expect(response.status).toBe(422);
  });

  it('should not do login with invalid password', async () => {
    const response = await request(App)
      .post('/auth')
      .send({ ...user, password: 'AAAAAAAAAAAAAAAAA' });

    console.log('response', response.body.message);
    expect(response.status).toBe(404);
  });
});
