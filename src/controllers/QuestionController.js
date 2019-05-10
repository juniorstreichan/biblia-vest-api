import QuestionService from '../services/QuestionService';

class QuestionController {
  async store(req, res) {
    try {
      const newQuestion = await QuestionService.create(req.body);
      return res.status(201).send(newQuestion);
    } catch (error) {
      console.log('error', error);
      return res.status(400).send({ message: error.message });
    }
  }
}
export default new QuestionController();
