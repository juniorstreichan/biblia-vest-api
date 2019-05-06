import { Router } from 'express';
import jwtAuthenticationMiddleware from '../middlewares/auth-middlewares';
import { newQuestionMiddleware } from '../middlewares/question-middlewares';
import Category from '../models/Category';

const questionRoute = Router();
questionRoute.baseUrl = '/questions';
questionRoute.post(
  '/',
  jwtAuthenticationMiddleware,
  newQuestionMiddleware,
  (req, res) => {
    console.log(req.body);

    return res.sendStatus(201);
  },
);

questionRoute.post('/test-jwt', jwtAuthenticationMiddleware, (req, res) => {
  //  rota para testes unitários
  const message = req.body;
  return res.status(200).send({ message });
});

questionRoute.post(
  '/categories',
  jwtAuthenticationMiddleware,
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
