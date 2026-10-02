import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import { UpdateUserDTO } from '../dtos/UpdateUserDTO';
import { IUser } from '../entities/IUser';
import { IHashProvider } from '../providers/IHashProvider';
import { IUserRepository } from '../repositories/IUserRepository';

@injectable()
export class UpdateUserService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('HashProvider') private hashProvider: IHashProvider,
  ) {}

  public async execute({ id, name, email, password, newPassword, userId }: UpdateUserDTO): Promise<IUser> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    if (user.id !== userId) {
      throw new AppError('You cannot update other users', 401);
    }
    if (email && email !== user.email && (await this.userRepository.findByEmail(email))) {
      throw new AppError('Email is already in use');
    }
    if (name) user.name = name;
    if (email) user.email = email;

    if (password && !newPassword) {
      throw new AppError('You must specify old and new password');
    }
    if (password && newPassword) {
      const checkPassword = await this.hashProvider.compareHash(password, user.password);
      if (!checkPassword) {
        throw new AppError('Wrong password given', 401);
      }
      user.password = await this.hashProvider.generateHash(newPassword);
    }
    return this.userRepository.save(user);
  }
}
