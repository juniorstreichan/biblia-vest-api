/* eslint-disable class-methods-use-this */
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenvConfig from './configs/dotenv-config';

class App {
  constructor() {
    dotenvConfig();
    this.express = express();
    this.middlewares();
  }

  routes() {}

  middlewares() {
    this.express.use(express.json());
    this.express.use(cors());
  }
}

export default new App().express;
