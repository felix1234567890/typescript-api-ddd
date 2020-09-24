import { Router } from 'express';
import { ReviewController } from '../controllers';

const routes = Router();
const reviewController = new ReviewController();

routes.get('/', reviewController.index);

export default routes;
