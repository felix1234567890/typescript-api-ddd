import { classToClass } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import { getRepository, Repository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import { UpdateUserDTO } from '../dtos/UpdateUserDTO';
import { User } from '../infra/typeorm/entity';
import { BcryptHashProvider } from '../providers/BCryptHashProvider';

@injectable()
export class UpdateUserService {
  private userRepository: Repository<User>;
  constructor(@inject('HashProvider') private hashProvider: BcryptHashProvider) {
    this.userRepository = getRepository(User);
  }

  public async execute({ id, name, email, password, newPassword, userId }: UpdateUserDTO): Promise<User> {
    if (typeof id === 'string') {
      id = parseInt(id);
    }
    const user = await this.userRepository.findOne({ id });
    if (!user) {
      throw new AppError('User not found', 404);
    }
    if (user.id !== parseInt(userId)) {
      throw new AppError('You cannot update other users', 401);
    }
    const emailExists = await this.userRepository.findOne({ where: { email } });
    if (emailExists) {
      throw new Error('Email is already in use');
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
    await this.userRepository.save(user);
    return classToClass(user);
  }
}
