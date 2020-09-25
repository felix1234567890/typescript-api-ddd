import { Router } from 'express';
import { ReviewController } from '../controllers';
import ReviewGetDeleteValidator from '../validators/ReviewGetDeleteValidator';

const routes = Router();
const reviewController = new ReviewController();

routes.get('/', reviewController.index);
routes.get('/:id', ReviewGetDeleteValidator, reviewController.review);

export default routes;
