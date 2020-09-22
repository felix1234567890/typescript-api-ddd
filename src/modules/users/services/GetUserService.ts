import { classToClass } from 'class-transformer';
import { injectable } from 'tsyringe';
import { getRepository, Repository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import { User } from '../infra/typeorm/entity';

@injectable()
export class GetUserService {
  private userRepository: Repository<User>;
  constructor() {
    this.userRepository = getRepository(User);
  }

  public async execute(id: number | string): Promise<User> {
    if (typeof id === 'string') {
      id = parseInt(id);
    }
    const user = await this.userRepository.findOne({ id });
    if (!user) {
      throw new AppError('User not found');
    }
    return classToClass(user);
  }
}
