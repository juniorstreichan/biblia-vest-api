import Question from '../models/Question';

class QuestionService {
  async create(question) {
    const newQuestion = await Question.create(question);
    return newQuestion;
  }

  async update(question) {
    const newQuestion = await Question.findOneAndUpdate({ _id: question._id }, question);
    return newQuestion;
  }
}

export default new QuestionService();
