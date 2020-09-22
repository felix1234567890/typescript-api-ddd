import { injectable } from 'tsyringe';
import { getRepository, Repository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import { User } from '../infra/typeorm/entity';

interface Request {
  id: number | string;
}

@injectable()
export class DeleteUserService {
  private userRepository: Repository<User>;
  constructor() {
    this.userRepository = getRepository(User);
  }

  public async execute({ id }: Request): Promise<void> {
    if (typeof id === 'string') {
      id = parseInt(id);
    }
    const user = await this.userRepository.findOne({ id });
    if (!user) {
      throw new AppError('User not found.', 404);
    }
    await this.userRepository.delete(id);
  }
}
