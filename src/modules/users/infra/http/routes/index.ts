import { Router } from 'express';
import { UserController } from '../controllers';
import UserDeleteValidator from '../validators/UserDeleteValidator';
import UserStoreValidator from '../validators/UserStoreValidator';

const routes = Router();
const userController = new UserController();
routes.get('/', userController.index);
routes.post('/', UserStoreValidator, userController.store);
routes.delete('/:id', UserDeleteValidator, userController.delete);
export default routes;
