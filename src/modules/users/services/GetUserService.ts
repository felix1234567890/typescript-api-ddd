import { injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import { User } from '../infra/typeorm/entity';
import { BaseUserService } from './BaseUserService';

@injectable()
export class GetUserService extends BaseUserService {
  public async execute(id: number | string): Promise<User> {
    if (typeof id === 'string') {
      id = parseInt(id);
    }
    const user = await this.userRepository.findOne({ where: {id} });
    if (!user) {
      throw new AppError('User not found');
    }
    return user
  }
}
