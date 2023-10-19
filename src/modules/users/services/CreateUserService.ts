import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { User } from '../infra/typeorm/entity';
import { BcryptHashProvider } from '../providers/BCryptHashProvider';
import { BaseUserService } from './BaseUserService';

@injectable()
export class CreateUserService extends BaseUserService {
  constructor(@inject('HashProvider') private hashProvider: BcryptHashProvider) {
    super();
  }

  public async execute({ name, email, password }: CreateUserDTO): Promise<User> {
    const userExists = await this.userRepository.findOne({ where: { email } });
    if (userExists) {
      throw new AppError('Email already in use');
    }
    const hashedPassword = await this.hashProvider.generateHash(password);
    const user = this.userRepository.create({ name, email, password: hashedPassword });
    await this.userRepository.save(user);
    return user;
  }
}
