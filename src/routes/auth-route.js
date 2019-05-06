import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import {
  newUserMiddleware,
  loginMiddleware,
} from '../middlewares/user-middlewares';

const authRouter = Router();

authRouter.baseUrl = '/auth';
authRouter.post('/create', newUserMiddleware, AuthController.store);

authRouter.post('/', loginMiddleware, AuthController.login);

export default authRouter;
