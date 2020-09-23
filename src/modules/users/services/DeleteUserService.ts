import { injectable } from 'tsyringe';
import { getRepository, Repository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import { User } from '../infra/typeorm/entity';

@injectable()
export class DeleteUserService {
  private userRepository: Repository<User>;
  constructor() {
    this.userRepository = getRepository(User);
  }

  public async execute(id: number | string, userId: string): Promise<void> {
    if (typeof id === 'string') {
      id = parseInt(id);
    }
    const user = await this.userRepository.findOne({ id });
    if (!user) {
      throw new AppError('User not found.', 404);
    }
    if (user.id !== parseInt(userId)) {
      throw new AppError('You cannot delete other users.', 401);
    }
    await this.userRepository.delete(id);
  }
}
