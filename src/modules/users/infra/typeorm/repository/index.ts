import { Repository } from 'typeorm';
import { dataSource } from '../../../../../data-source';
import { CreateUserDTO } from '../../../dtos/CreateUserDTO';
import { GetUsersDTO } from '../../../dtos/GetUsersDTO';
import { IUser } from '../../../entities/IUser';
import { IUserRepository } from '../../../repositories/IUserRepository';
import { User } from '../entity';

class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = dataSource.getRepository(User);
  }

  public findById(id: number): Promise<User | null> {
    return this.ormRepository.findOne({ where: { id } });
  }

  public findByEmail(email: string): Promise<User | null> {
    return this.ormRepository.findOne({ where: { email } });
  }

  public findAll(): Promise<User[]> {
    return this.ormRepository.find({ relations: { books: true } });
  }

  public findPage({ skip, limit }: Required<GetUsersDTO>): Promise<User[]> {
    return this.ormRepository.find({ skip, take: limit });
  }

  public async create(data: CreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(data);
    return this.ormRepository.save(user);
  }

  public save(user: IUser): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
export default UserRepository;
