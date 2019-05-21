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

  async getValid(req, res) {
    try {
      const questions = await QuestionService.findValid();
      return res.status(200).send(questions);
    } catch (error) {
      /* istanbul ignore next */
      console.log('[error]', error);
      /* istanbul ignore next */
      return res.status(400).send({ message: error.message });
    }
  }

  async getPage(req, res) {
    try {
      const page = parseInt(req.query.page.replace('-', ''), 10) || 1;
      const perPage = parseInt(req.query.perPage.replace('-', ''), 10) || 10;

      const questions = await QuestionService.findPage(page, perPage);
      return res.status(200).send(questions);
    } catch (error) {
      /* istanbul ignore next */
      console.log('[error]', error);
      /* istanbul ignore next */
      return res.status(400).send({ message: error.message });
    }
  }

  async getUpdated(req, res) {
    try {
      const date = new Date(req.params.date);
      console.log('req.params.date', date);

      const questions = await QuestionService.findUpdated(date);
      return res.status(200).send(questions);
    } catch (error) {
      /* istanbul ignore next */
      console.log('[error]', error);
      /* istanbul ignore next */
      return res.status(400).send({ message: error.message });
    }
  }
}
export default new QuestionController();
