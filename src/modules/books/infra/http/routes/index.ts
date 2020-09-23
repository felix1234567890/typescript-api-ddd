import { Router } from 'express';
import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';
import { BookController } from '../controllers';
import BookStoreValidator from '../validators/BookStoreValidator';

const routes = Router();
const bookController = new BookController();
routes.get('/', bookController.index);
routes.post('/', ensureAuthenticated, BookStoreValidator, bookController.store);
export default routes;
