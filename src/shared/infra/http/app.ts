import express, { Application, Request, Response, NextFunction } from 'express';
import 'reflect-metadata';
import 'express-async-errors';
import { errors } from 'celebrate';
import '../../container/index';
import createConnection from '../typeorm/index';
import AppError from '../../errors/AppError';
import routes from './routes';

class App {
  public server: Application;
  constructor() {
    createConnection();
    this.server = express();
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  private middlewares(): void {
    this.server.use(express.json());
  }

  private routes(): void {
    this.server.use(routes);
  }

  private exceptionHandler(): void {
    this.server.use(errors());
    this.server.use((err: Error, request: Request, response: Response, _next: NextFunction) => {
      if (err instanceof AppError) {
        return response.status(err.statusCode).json({
          message: err.message,
        });
      }
      // eslint-disable-next-line
      console.log(err);

      return response.status(500).json({
        message: 'Internal server error',
      });
    });
  }
}
export default new App().server;
