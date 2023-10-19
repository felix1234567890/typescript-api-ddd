import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { GetUsersDTO } from '../../../dtos/GetUsersDTO';
import { AuthenticateUserService } from '../../../services/AuthenticateUserService';
import { CreateUserService } from '../../../services/CreateUserService';
import { DeleteUserService } from '../../../services/DeleteUserService';
import { GetUserService } from '../../../services/GetUserService';
import { GetUsersService } from '../../../services/GetUsersService';
import { UpdateUserService } from '../../../services/UpdateUserService';

export class UserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { skip, limit } = request.query as GetUsersDTO;
    const getUsers = container.resolve(GetUsersService);
    const users = await getUsers.execute({ skip, limit });
    return response.status(200).json(users);
  }

  public async user(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const getUser = container.resolve(GetUserService);
    const user = await getUser.execute(id);
    return response.status(200).json(user);
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute({ name, email, password });
    return response.status(201).json(user);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { id: userId } = request.user;
    const deleteUser = container.resolve(DeleteUserService);
    await deleteUser.execute(id, userId);
    return response.status(204).json();
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, password, newPassword } = request.body;
    const { id } = request.params;
    console.log(request.user);
    const { id: userId } = request.user;
    const updateUser = container.resolve(UpdateUserService);
    const user = await updateUser.execute({ id, name, email, password, newPassword, userId });
    return response.status(200).json(user);
  }

  public async login(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const loginUser = container.resolve(AuthenticateUserService);
    const res = await loginUser.execute({ email, password });
    return response.status(200).json(res);
  }
}
