import { Router } from 'express';
import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';
import { ReviewController } from '../controllers';
import ReviewGetDeleteValidator from '../validators/ReviewGetDeleteValidator';
import ReviewStoreValidator from '../validators/ReviewStoreValidator';

const routes = Router();
const reviewController = new ReviewController();

routes.get('/', reviewController.index);
routes.post('/', ensureAuthenticated, ReviewStoreValidator, reviewController.store);
routes.get('/:id', ReviewGetDeleteValidator, reviewController.review);

export default routes;
