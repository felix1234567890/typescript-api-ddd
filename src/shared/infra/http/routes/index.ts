import { Router } from 'express';
import userRouter from '../../../../modules/users/infra/http/routes';
import bookRouter from '../../../../modules/books/infra/http/routes';
import reviewRouter from '../../../../modules/reviews/infra/http/routes';

const routes = Router();

routes.use('/users', userRouter);
routes.use('/books', bookRouter);
routes.use('/reviews', reviewRouter);

export default routes;
