import QuestionService from '../services/QuestionService';
import logger from '../tools/logger';

class QuestionController {
  async store(req, res) {
    try {
      const question = req.body;

      question.creator = req.userId;

      const newQuestion = await QuestionService.create(question);
      return res.status(201).send(newQuestion);
    } catch (error) {
      logger.info(`[error] ${error}`);
      return res.status(400).send({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const newQuestion = await QuestionService.update(req.body);
      return res.status(200).send(newQuestion);
    } catch (error) {
      /* istanbul ignore next */
      logger.info(`[error] ${error}`);
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
      logger.info(`[error] ${error}`);
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
      logger.info(`[error] ${error}`);
      /* istanbul ignore next */
      return res.status(400).send({ message: error.message });
    }
  }

  async getUpdated(req, res) {
    try {
      const date = new Date(req.params.date);
      logger.info('req.params.date', date);

      const questions = await QuestionService.findUpdated(date);
      return res.status(200).send(questions);
    } catch (error) {
      /* istanbul ignore next */
      logger.info(`[error] ${error}`);
      /* istanbul ignore next */
      return res.status(400).send({ message: error.message });
    }
  }
}
export default new QuestionController();
