import faker from 'faker';
import { connectMongoDBTest, disconnectMongoDBTest } from '../utils/db-utils';
import Question from '../../src/models/Question';
import Category from '../../src/models/Category';

describe('Suite test CRUD model Question', () => {
  beforeAll(async () => {
    await connectMongoDBTest();
  });
  afterAll(async () => {
    await disconnectMongoDBTest();
  });

  const question = {
    description: faker.lorem.sentence(10),
    alternatives: [
      { id: 1, description: faker.lorem.sentence(3) },
      { id: 2, description: faker.lorem.sentence(3) },
      { id: 3, description: faker.lorem.sentence(3) },
      { id: 4, description: faker.lorem.sentence(3) },
    ],
    correct: 1,
    categories: [
      { name: faker.name.jobArea() },
      { name: faker.name.jobArea() },
    ],
    active: true,
  };

  it('should create a new Question model', async () => {
    const categories = await Category.create([
      { name: faker.name.jobArea() },
      { name: faker.name.jobArea() },
    ]);

    question.categories = categories.map(cat => cat._id);
    console.log('categories', categories);
    const newQuestion = await Question.create(question);
    console.log('newQuestion', newQuestion);

    expect(newQuestion).not.toBeNull();
  });
});
