import { injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import { BaseUserService } from './BaseUserService';

@injectable()
export class DeleteUserService extends BaseUserService {
  public async execute(id: number | string, userId: string): Promise<void> {
    if (typeof id === 'string') {
      id = parseInt(id);
    }
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new AppError('User not found', 404);
    }
    if (user.id !== parseInt(userId)) {
      throw new AppError('You cannot delete other users', 401);
    }
    await this.userRepository.delete(id);
  }
}
