import httpRequest from 'supertest';
import app from '../../src/app';
import Category from '../../src/models/Category';
import Question from '../../src/models/Question';
import { connectMongoDBTest, disconnectMongoDBTest } from '../utils/db-utils';
import { generateCategory, generateQuestion } from '../utils/mock-data';

describe('Public Requests test suite', () => {
  beforeAll(async () => {
    await connectMongoDBTest();
  });
  afterAll(async () => {
    await disconnectMongoDBTest();
  });

  it('should create the Questions for find', async () => {
    const cats = await Category.create(generateCategory(10));
    console.log('[cats]', cats);

    const questions = generateQuestion(10);

    questions.forEach((question, index) => {
      question.categories.push(cats[index]);
    });

    const newQuestions = await Question.create(questions);

    expect(cats.length).toBe(10);
    expect(newQuestions.length).toBe(10);
  });

  it('should find All valid questions', async () => {
    const response = await httpRequest(app)
      .get('/questions')
      .send();

    console.log('[questios]', response.body);

    expect(response.body).not.toBeNull();
    expect(response.status).toBe(200);
  });
});
