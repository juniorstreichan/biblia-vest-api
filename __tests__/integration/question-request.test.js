import faker from 'faker';
import httpRequest from 'supertest';
import App from '../../src/app';
import { connectMongoDBTest, disconnectMongoDBTest } from '../utils/db-utils';

describe('Question test suite', () => {
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
    description: faker.lorem.sentence(10, 10),
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
    const response = await httpRequest(App)
      .post('/auth/create')
      .send(user);

    user.token = response.body.token;
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('user');
  });

  it('should create a new Category models from the http request', async () => {
    const response = await httpRequest(App)
      .post('/questions/categories')
      .set('Authorization', `Bearer ${user.token}`)
      .send([{ name: faker.name.jobArea() }, { name: faker.name.jobArea() }]);

    console.log('response-categories', response.body);
    question.categories = response.body.map(cat => cat._id);
    expect(response.body).not.toBeNull();
    expect(response.body.length).toBe(2);
  });

  it('should reject no body http request of Category', async () => {
    const response = await httpRequest(App)
      .post('/questions/categories')
      .set('Authorization', `Bearer ${user.token}`)
      .send(null);

    console.log(response.body.message);
    expect(response.status).toBe(400);
  });
  it('should reject invalid http request of Category', async () => {
    const response = await httpRequest(App)
      .post('/questions/categories')
      .set('Authorization', `Bearer ${user.token}`)
      .send([{ teste: null }]);

    console.log(response.body.message);
    expect(response.status).toBe(422);
  });

  it('should create a new Question model from the http request', async () => {
    const response = await httpRequest(App)
      .post('/questions')
      .set('Authorization', `Bearer ${user.token}`)
      .send(question);
    question._id = response.body._id;
    expect(response.status).toBe(201);
    expect(response.body).not.toBeNull();
  });

  it('should reject no body http request Question', async () => {
    const response = await httpRequest(App)
      .post('/questions')
      .set('Authorization', `Bearer ${user.token}`)
      .send(null);

    console.log(response.body.message);
    expect(response.status).toBe(400);
  });

  it('should reject invalid http request Question without description', async () => {
    const response = await httpRequest(App)
      .post('/questions')
      .set('Authorization', `Bearer ${user.token}`)
      .send({ ...question, _id: undefined, description: '' });

    console.log(response.body.message);
    expect(response.status).toBe(422);
  });

  it('should reject invalid http request Question without alternatives', async () => {
    const response = await httpRequest(App)
      .post('/questions')
      .set('Authorization', `Bearer ${user.token}`)
      .send({ ...question, _id: undefined, alternatives: [] });

    console.log(response.body.message);
    expect(response.status).toBe(422);
  });

  it('should reject invalid http request Question with invalid alternatives(id repeted)', async () => {
    const alternativesError = [
      { id: 1, description: faker.lorem.sentence(3) },
      { id: 2, description: faker.lorem.sentence(3) },
      { id: 3, description: faker.lorem.sentence(3) },
      { id: 3, description: faker.lorem.sentence(3) },
    ];

    const response = await httpRequest(App)
      .post('/questions')
      .set('Authorization', `Bearer ${user.token}`)
      .send({ ...question, _id: undefined, alternatives: alternativesError });

    console.log(response.body.message);
    expect(response.status).toBe(400);
  });

  it('should reject invalid http request Question with correct alternative not found', async () => {
    const response = await httpRequest(App)
      .post('/questions')
      .set('Authorization', `Bearer ${user.token}`)
      .send({ ...question, _id: undefined, correct: 999 });

    console.log(response.body.message);
    expect(response.status).toBe(400);
  });

  it('should update the Question from the http request', async () => {
    const response = await httpRequest(App)
      .put('/questions')
      .set('Authorization', `Bearer ${user.token}`)
      .send({ ...question, description: faker.lorem.sentence(10, 10) });

    question.description = response.body.description;
    // console.log(response.body);
    expect(response.status).toBe(200);
  });

  it('should reject update the Question without _id', async () => {
    const response = await httpRequest(App)
      .put('/questions')
      .set('Authorization', `Bearer ${user.token}`)
      .send({
        ...question,
        _id: undefined,
        description: faker.lorem.sentence(10, 10),
      });

    // console.log(response.body);
    expect(response.status).toBe(422);
  });
});
