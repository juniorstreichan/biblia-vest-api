import faker from 'faker';

export function generateQuestion(numOfQuestions = 1) {
  if (!numOfQuestions || numOfQuestions <= 1) {
    return {
      description: faker.lorem.sentence(10, 10),
      alternatives: [
        { id: 1, description: faker.lorem.sentence(3) },
        { id: 2, description: faker.lorem.sentence(3) },
        { id: 3, description: faker.lorem.sentence(3) },
        { id: 4, description: faker.lorem.sentence(3) },
      ],
      correct: parseInt(Math.random() * 4, 10) + 1,
      categories: [],
      active: true,
    };
  }
  return new Array(numOfQuestions).fill({}).map(() => ({
    description: faker.lorem.sentence(10, 10),
    alternatives: [
      { id: 1, description: faker.lorem.sentence(3) },
      { id: 2, description: faker.lorem.sentence(3) },
      { id: 3, description: faker.lorem.sentence(3) },
      { id: 4, description: faker.lorem.sentence(3) },
    ],
    correct: parseInt(Math.random() * 4, 10) + 1,
    categories: [],
    active: true,
  }));
}

export function generateUser(numOfUsers = 1) {
  if (!numOfUsers || numOfUsers <= 1) {
    return {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
  }
  return new Array(numOfUsers).fill({}).map(() => ({
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }));
}

export function generateCategory(numOfCategories = 1) {
  if (!numOfCategories || numOfCategories <= 1) {
    return {
      name: faker.name.findName(),
    };
  }
  return new Array(numOfCategories).fill({}).map(() => ({
    name: faker.name.findName(),
  }));
}
