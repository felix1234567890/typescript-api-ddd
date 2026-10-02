import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { GetUsersDTO } from '../dtos/GetUsersDTO';
import { IUser } from '../entities/IUser';

export interface IUserRepository {
  findById(id: number): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  /** All users, each with their books. */
  findAll(): Promise<IUser[]>;
  findPage(page: Required<GetUsersDTO>): Promise<IUser[]>;
  create(data: CreateUserDTO): Promise<IUser>;
  save(user: IUser): Promise<IUser>;
  delete(id: number): Promise<void>;
}
