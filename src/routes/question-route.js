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

/**
 * @swagger
 *
 *  /questions:
 *   post:
 *     summary: Add new Question
 *     description: Add new Question
 *     parameters:
 *       - in: body
 *         name: question
 *         required: true
 *         schema:
 *           $ref: '#/definitions/NewQuestion'
 *     responses:
 *       201:
 *         description: CREATED
 *         schema:
 *           $ref: '#/definitions/Question'
 *       '400':
 *         description: Bad Request
 *       '422':
 *         description: Not valid
 */
questionRoute.post(
  '/',
  jwtAuthenticationMiddleware,
  newQuestionMiddleware,
  QuestionController.store,
);

/**
 * @swagger
 *
 *  /questions:
 *    put:
 *     summary: Update a Question
 *     description: Update a Question
 *     parameters:
 *       - in: body
 *         name: question
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Question'
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           $ref: '#/definitions/Question'
 *       '400':
 *         description: Bad Request
 *       '422':
 *         description: Not valid
 */
questionRoute.put(
  '/',
  jwtAuthenticationMiddleware,
  updateQuestionMiddleware,
  QuestionController.update,
);

/**
 * @swagger
 *  /questions:
 *    get:
 *     summary: Find Questions valid
 *     description: Find Questions valid
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Question'
 *       '400':
 *            description: Bad Request
 */
questionRoute.get('/', QuestionController.getValid);

questionRoute.post('/test-jwt', jwtAuthenticationMiddleware, (req, res) => {
  //  rota para testes unitários
  const message = req.body;
  return res.status(200).send({ message });
});

/**
 * @swagger
 *
 *  /questions/categories:
 *   post:
 *     summary: Add new Category
 *     description: Add new Category
 *     parameters:
 *       - in: body
 *         name: category
 *         required: true
 *         schema:
 *           $ref: '#/definitions/NewCategory'
 *     responses:
 *       201:
 *         description: CREATED
 *         schema:
 *           $ref: '#/definitions/Category'
 *       '400':
 *         description: Bad Request
 *       '422':
 *         description: Not valid
 */
questionRoute.post(
  '/categories',
  jwtAuthenticationMiddleware,
  newCategoryMiddleware,
  CategoryController.store,
);

/**
 * @swagger
 *  /questions/categories:
 *    get:
 *     summary: Find categories
 *     description: Find categories
 *     responses:
 *       200:
 *          description: OK
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/definitions/Category'
 *       '400':
 *           description: Bad Request
 */
questionRoute.get('/categories', CategoryController.getAll);

/**
 * @swagger
 *
 * /questions/updated/{date}:
 *    get:
 *      summary: Find Questions valid by date
 *      description: Find Questions valid by date
 *      parameters:
 *        - in: path
 *          name: date
 *          required: true
 *          type: string
 *          format: date
 *      responses:
 *        200:
 *          description: OK
 *          schema:
 *            type: array
 *            items:
 *              $ref: '#/definitions/Question'
 *        '400':
 *             description: Bad Request
 */
questionRoute.get('/updated/:date', QuestionController.getUpdated);

/**
 * @swagger
 *
 *  /questions/paginate:
 *   get:
 *     summary: Find page of Questions
 *     description: Find page of Questions
 *     parameters:
 *       - in: query
 *         name: page
 *         required: true
 *         type: number
 *       - in: query
 *         name: perPage
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: OK
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Question'
 *       '400':
 *            description: Bad Request
 */
questionRoute.get(
  '/paginate',
  jwtAuthenticationMiddleware,
  QuestionController.getPage,
);

export default questionRoute;
