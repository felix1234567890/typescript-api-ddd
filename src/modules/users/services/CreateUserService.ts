import { classToClass } from 'class-transformer';
import { inject, injectable } from 'tsyringe';
import { getRepository, Repository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import { CreateUserDTO } from '../dtos/CreateUserDTO';
import { User } from '../infra/typeorm/entity';
import { BcryptHashProvider } from '../providers/BCryptHashProvider';

@injectable()
export class CreateUserService {
  private userRepository: Repository<User>;
  constructor(@inject('HashProvider') private hashProvider: BcryptHashProvider) {
    this.userRepository = getRepository(User);
  }

  public async execute({ name, email, password }: CreateUserDTO): Promise<User> {
    const userExists = await this.userRepository.findOne({ where: { email } });
    if (userExists) {
      throw new AppError('Email already in use');
    }
    const hashedPassword = await this.hashProvider.generateHash(password);
    const user = this.userRepository.create({ name, email, password: hashedPassword });
    await this.userRepository.save(user);
    return classToClass(user);
  }
}
