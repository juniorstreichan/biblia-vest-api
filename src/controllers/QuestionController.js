import QuestionService from '../services/QuestionService';

class QuestionController {
  async store(req, res) {
    try {
      const newQuestion = await QuestionService.create(req.body);
      return res.status(201).send(newQuestion);
    } catch (error) {
      console.log('[error]', error);
      return res.status(400).send({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const newQuestion = await QuestionService.update(req.body);
      return res.status(200).send(newQuestion);
    } catch (error) {
      /* istanbul ignore next */
      console.log('[error]', error);
      /* istanbul ignore next */
      return res.status(400).send({ message: error.message });
    }
  }
}
export default new QuestionController();
