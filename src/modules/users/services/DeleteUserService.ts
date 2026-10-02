import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import { IUserRepository } from '../repositories/IUserRepository';

@injectable()
export class DeleteUserService {
  constructor(@inject('UserRepository') private userRepository: IUserRepository) {}

  public async execute(id: number, userId: number): Promise<void> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    if (user.id !== userId) {
      throw new AppError('You cannot delete other users', 401);
    }
    await this.userRepository.delete(id);
  }
}
