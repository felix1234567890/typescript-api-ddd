import { Router } from 'express';
import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';
import { BookController } from '../controllers';
import BookGetDeleteValidator from '../validators/BookGetDeleteValidator';
import BookStoreValidator from '../validators/BookStoreValidator';
import BookUpdateValidator from '../validators/BookUpdateValidator';

const routes = Router();
const bookController = new BookController();
routes.get('/', bookController.index);
routes.get('/:id', BookGetDeleteValidator, bookController.book);
routes.delete('/:id', ensureAuthenticated, BookGetDeleteValidator, bookController.delete);
routes.put('/:id', ensureAuthenticated, BookUpdateValidator, bookController.update);
routes.post('/', ensureAuthenticated, BookStoreValidator, bookController.store);
export default routes;
