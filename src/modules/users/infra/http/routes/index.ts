import { Router } from 'express';
import { UserController } from '../controllers';
import UserGetDeleteValidator from '../validators/UserGetDeleteValidator';
import UserStoreValidator from '../validators/UserStoreValidator';
import UserUpdateValidator from '../validators/UserUpdateValidator';

const routes = Router();
const userController = new UserController();
routes.get('/', userController.index);
routes.get('/:id', UserGetDeleteValidator, userController.user);
routes.post('/', UserStoreValidator, userController.store);
routes.put('/:id', UserUpdateValidator, userController.update);
routes.delete('/:id', UserGetDeleteValidator, userController.delete);
export default routes;
