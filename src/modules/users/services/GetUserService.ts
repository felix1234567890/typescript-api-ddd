import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import { IUser } from '../entities/IUser';
import { IUserRepository } from '../repositories/IUserRepository';

@injectable()
export class GetUserService {
  constructor(@inject('UserRepository') private userRepository: IUserRepository) {}

  public async execute(id: number): Promise<IUser> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new AppError('User not found');
    }
    return user;
  }
}
