import { Router } from 'express';
import jwtAuthenticationMiddleware from '../middlewares/auth-middlewares';
import {
  newQuestionMiddleware,
  newCategoryMiddleware,
} from '../middlewares/question-middlewares';
import Category from '../models/Category';
import QuestionController from '../controllers/QuestionController';

const questionRoute = Router();
questionRoute.baseUrl = '/questions';
questionRoute.post(
  '/',
  jwtAuthenticationMiddleware,
  newQuestionMiddleware,
  QuestionController.store,
);

questionRoute.post('/test-jwt', jwtAuthenticationMiddleware, (req, res) => {
  //  rota para testes unitários
  const message = req.body;
  return res.status(200).send({ message });
});

questionRoute.post(
  '/categories',
  jwtAuthenticationMiddleware,
  newCategoryMiddleware,
  async (req, res) => {
    try {
      const cats = await Category.create(req.body);
      return res.status(201).send(cats);
    } catch (error) {
      console.log(error.message);
      return res.status(400).send();
    }
  },
);

export default questionRoute;
