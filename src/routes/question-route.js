import { Router } from 'express';
import CategoryController from '../controllers/CategoryController';
import QuestionController from '../controllers/QuestionController';
import jwtAuthenticationMiddleware from '../middlewares/jwt-middlewares';
import {
  newCategoryMiddleware,
  newQuestionMiddleware,
  updateQuestionMiddleware,
} from '../middlewares/question-middlewares';

const questionRoute = Router();
questionRoute.baseUrl = '/questions';

questionRoute.post(
  '/',
  jwtAuthenticationMiddleware,
  newQuestionMiddleware,
  QuestionController.store,
);

questionRoute.put(
  '/',
  jwtAuthenticationMiddleware,
  updateQuestionMiddleware,
  QuestionController.update,
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
  CategoryController.store,
);
questionRoute.get('/categories', CategoryController.getAll);

questionRoute.get('/', QuestionController.getValid);

questionRoute.get('/updated/:date', QuestionController.getUpdated);

questionRoute.get(
  '/paginate',
  jwtAuthenticationMiddleware,
  QuestionController.getPage,
);

export default questionRoute;
