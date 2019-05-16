import Repository from '../models/Question';

class QuestionService {
  async create(question) {
    const newQuestion = await Repository.create(question);
    return newQuestion;
  }

  async update(question) {
    const newQuestion = await Repository.findOneAndUpdate({ _id: question._id }, question);
    return newQuestion;
  }

  async findValid() {
    const questions = await Repository.find(
      { active: true },
      'description alternatives correct',
    ).populate('categories');

    return questions;
  }
}

export default new QuestionService();
