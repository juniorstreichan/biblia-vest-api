import Question from '../models/Question';

class QuestionService {
  async create(question) {
    const newQuestion = await Question.create(question);
    return newQuestion;
  }
}

export default new QuestionService();
