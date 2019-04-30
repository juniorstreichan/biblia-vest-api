import cors from 'cors';
import express from 'express';
import dotenvConfig from './configs/dotenv-config';
import authRoute from './routes/auth-route';

class App {
  constructor() {
    dotenvConfig();
    this.express = express();
    this.middlewares();
    this.routes();
  }

  routes() {
    this.express.use('/auth', authRoute);
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(cors());
  }
}

export default new App().express;
