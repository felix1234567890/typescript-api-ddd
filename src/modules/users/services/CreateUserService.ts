import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { IUser } from '../entities/IUser';
import { IHashProvider } from '../providers/IHashProvider';
import { IUserRepository } from '../repositories/IUserRepository';

@injectable()
export class CreateUserService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('HashProvider') private hashProvider: IHashProvider,
  ) {}

  public async execute({ name, email, password }: CreateUserDTO): Promise<IUser> {
    if (await this.userRepository.findByEmail(email)) {
      throw new AppError('Email already in use');
    }
    const hashedPassword = await this.hashProvider.generateHash(password);
    return this.userRepository.create({ name, email, password: hashedPassword });
  }
}
