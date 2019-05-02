import { Router } from 'express';
import jwtAuthenticationMiddleware from '../middlewares/auth-middlewares';

const questionRoute = Router();

questionRoute.post('/', jwtAuthenticationMiddleware, (req, res) => {
  console.log(req.body);

  return res.sendStatus(200);
});

export default questionRoute;
