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

  async findPage(page = 1, perPage = 5) {
    const skip = page === 1 ? 0 : (page - 1) * perPage;
    const questions = await Repository.find({}, '', {
      skip,
      limit: perPage,
    })
      .sort({ createdAt: -1 })
      .populate('categories');

    return questions;
  }
}

export default new QuestionService();
