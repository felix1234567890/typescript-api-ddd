import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserService } from '../../../services/CreateUserService';
import { DeleteUserService } from '../../../services/DeleteUserService';
import { GetUsersService } from '../../../services/GetUsersService';

export class UserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const getUsers = container.resolve(GetUsersService);
    const users = await getUsers.execute();
    return response.status(200).json(users);
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute({ name, email, password });
    return response.status(201).json(user);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteUser = container.resolve(DeleteUserService);
    await deleteUser.execute({ id });

    return response.status(204).json();
  }
}
