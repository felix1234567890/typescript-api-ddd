import { classToClass } from 'class-transformer';
import { injectable } from 'tsyringe';
import { getRepository, Repository } from 'typeorm';
import { User } from '../infra/typeorm/entity';

@injectable()
export class GetUsersService {
  private userRepository: Repository<User>;
  constructor() {
    this.userRepository = getRepository(User);
  }

  public async execute(): Promise<User[]> {
    const users = await this.userRepository.find();
    return classToClass(users);
  }
}
