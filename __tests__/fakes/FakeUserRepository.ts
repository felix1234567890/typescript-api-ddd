import { CreateUserDTO } from '../../src/modules/users/dtos/CreateUserDTO';
import { GetUsersDTO } from '../../src/modules/users/dtos/GetUsersDTO';
import { IUser } from '../../src/modules/users/entities/IUser';
import { IUserRepository } from '../../src/modules/users/repositories/IUserRepository';

export class FakeUserRepository implements IUserRepository {
  private users: IUser[] = [];
  private nextId = 1;

  public async findById(id: number): Promise<IUser | null> {
    return this.users.find(user => user.id === id) ?? null;
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    return this.users.find(user => user.email === email) ?? null;
  }

  public async findAll(): Promise<IUser[]> {
    return this.users;
  }

  public async findPage({ skip, limit }: Required<GetUsersDTO>): Promise<IUser[]> {
    return this.users.slice(skip, skip + limit);
  }

  public async create(data: CreateUserDTO): Promise<IUser> {
    const user: IUser = { id: this.nextId++, ...data, createdAt: new Date(), updatedAt: new Date() };
    this.users.push(user);
    return user;
  }

  public async save(user: IUser): Promise<IUser> {
    const index = this.users.findIndex(u => u.id === user.id);
    this.users[index] = user;
    return user;
  }

  public async delete(id: number): Promise<void> {
    this.users = this.users.filter(user => user.id !== id);
  }
}
