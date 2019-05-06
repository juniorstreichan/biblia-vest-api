import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import dotenvConfig from './configs/dotenv-config';
import authRoute from './routes/auth-route';
import questionRoute from './routes/question-route';

class App {
  constructor() {
    dotenvConfig();
    this.express = express();
    this.middlewares();
    this.routes();
  }

  routes() {
    this.express.use(authRoute.baseUrl, authRoute);
    this.express.use(questionRoute.baseUrl, questionRoute);
  }

  middlewares() {
    this.express.use(helmet());
    this.express.use(express.json());
    this.express.use(cors());
  }
}

export default new App().express;
