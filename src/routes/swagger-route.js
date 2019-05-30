import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from '../configs/swagger.json';

const swaggerRoute = Router();
swaggerRoute.baseUrl = '/api/docs';
swaggerRoute.use('/', swaggerUi.serve);
swaggerRoute.get('/', swaggerUi.setup(swaggerDoc));
swaggerRoute.get('/json', (req, res) => res.send(swaggerDoc));

export default swaggerRoute;
