import { Router } from 'express';
import { UserController } from '../controllers';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import LoginUserValidator from '../validators/LoginUserValidator';
import UserGetDeleteValidator from '../validators/UserGetDeleteValidator';
import UsersGetValidator from '../validators/UsersGetValidator';
import UserStoreValidator from '../validators/UserStoreValidator';
import UserUpdateValidator from '../validators/UserUpdateValidator';

const routes = Router();
const userController = new UserController();
routes.get('/', UsersGetValidator, userController.index);
routes.get('/:id', UserGetDeleteValidator, userController.user);
routes.post('/', UserStoreValidator, userController.store);
routes.post('/login', LoginUserValidator, userController.login);
routes.put('/:id', ensureAuthenticated, UserUpdateValidator, userController.update);
routes.delete('/:id', ensureAuthenticated, UserGetDeleteValidator, userController.delete);
export default routes;
