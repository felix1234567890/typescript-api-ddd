import { Router } from 'express';
import { BookController } from '../controllers';

const routes = Router();
const bookController = new BookController();
routes.get('/', bookController.index);
export default routes;
