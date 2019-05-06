import faker from 'faker';
import Category from '../../src/models/Category';
import Question from '../../src/models/Question';
import { connectMongoDBTest, disconnectMongoDBTest } from '../utils/db-utils';

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
    categories: [],
    active: true,
  };
  it('should create a new Category models', async () => {
    const categories = await Category.create([
      { name: faker.name.jobArea() },
      { name: faker.name.jobArea() },
    ]);
    console.log('categories', categories);
    question.categories = categories.map(cat => cat._id);
    expect(categories).not.toBeNull();
    expect(categories.length).toBe(2);
  });

  it('should create a new Question model', async () => {
    const newQuestion = await Question.create(question);

    question._id = newQuestion._id;
    console.log('newQuestion', newQuestion);

    expect(newQuestion).not.toBeNull();
  });

  it('should reject to add a new Question with invalid alternatives', async () => {
    let msgError = null;
    const alternativesError = [
      { id: 1, description: faker.lorem.sentence(3) },
      { id: 2, description: faker.lorem.sentence(3) },
      { id: 3, description: faker.lorem.sentence(3) },
      { id: 3, description: faker.lorem.sentence(3) },
    ];

    try {
      await Question.create({
        ...question,
        _id: undefined,
        alternatives: alternativesError,
      });
    } catch (error) {
      msgError = error.message;
      console.log(msgError);
    }
    expect(msgError).not.toBeNull();
  });

  it('should reject to add a new Question without correct alternative', async () => {
    let msgError = null;
    try {
      await Question.create({
        ...question,
        _id: undefined,
        correct: 100,
      });
    } catch (error) {
      msgError = error.message;
      console.log(msgError);
    }

    expect(msgError).not.toBeNull();
  });

  it('should reject to add a new Question without categories alternative', async () => {
    let msgError = null;
    try {
      await Question.create({
        ...question,
        _id: undefined,
        categories: [],
      });
    } catch (error) {
      msgError = error.message;
    }

    expect(msgError).not.toBeNull();
  });

  it('should update Question', async () => {
    question.alternatives.push({ id: 5, description: faker.lorem.sentence(3) });

    await Question.findOneAndUpdate(
      { _id: question._id },
      { ...question, correct: 5 },
    );
    const updateQuestion = await Question.findById(question._id);

    expect(updateQuestion.correct).toBe(5);
    expect(updateQuestion.alternatives.length).toBe(5);
  });

  it('should delete Question', async () => {
    await Question.findOneAndDelete({ _id: question._id });
    const deletedQuestion = await Question.findById(question._id);

    expect(deletedQuestion).toBeNull();
  });
});
