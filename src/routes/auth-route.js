import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import {
  newUserMiddleware,
  loginMiddleware,
} from '../middlewares/user-middlewares';

const authRouter = Router();

authRouter.baseUrl = '/auth';

/**
 * @swagger
 * /auth:
 *   post:
 *     summary: Login in the API
 *     description: Login in the API
 *     parameters:
 *       - in: body
 *         name: user
 *         required: true
 *         schema:
 *           $ref: '#/definitions/UserLogin'
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: OK
 *         schema:
 *           $ref: '#/definitions/UserReturn'
 *       '400':
 *         description: Bad Request
 *       '422':
 *         description: Not valid
 *
 */
authRouter.post('/', loginMiddleware, AuthController.login);

/**
 * @swagger
 *
 * /auth/create:
 *  post:
 *    summary: Create a new User
 *    description: Create a new User
 *    parameters:
 *      - in: body
 *        name: user
 *        required: true
 *        schema:
 *          $ref: '#/definitions/User'
 *
 *    consumes:
 *      - application/json
 *    produces:
 *      - application/json
 *    responses:
 *      200:
 *        description: OK
 *        schema:
 *          $ref: '#/definitions/UserReturn'
 *      422:
 *        description: Not valid
 *      400:
 *        description: Bad Request
 */
authRouter.post('/create', newUserMiddleware, AuthController.store);

export default authRouter;
