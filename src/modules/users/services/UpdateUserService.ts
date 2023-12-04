import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import { UpdateUserDTO } from '../dtos/UpdateUserDTO';
import { User } from '../infra/typeorm/entity';
import { BcryptHashProvider } from '../providers/BCryptHashProvider';
import { BaseUserService } from './BaseUserService';

@injectable()
export class UpdateUserService extends BaseUserService {
  constructor(@inject('HashProvider') private hashProvider: BcryptHashProvider) {
    super();
  }

  public async execute({ id, name, email, password, newPassword, userId }: UpdateUserDTO): Promise<User|undefined|null> {
   let user
      if (typeof id === 'string') {
        id = parseInt(id);
      }
       user = await this.userRepository.findOne({ where: { id } });
      if (!user) {
        throw new AppError('User not found', 404);
      }
      if (user.id !== parseInt(userId)) {
        throw new AppError('You cannot update other users', 401);
      }
      // const emailExists = await this.userRepository.findOne({ where: { email } });
      // if (emailExists) {
      //   throw new Error('Email is already in use');
      // }
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
      user = await this.userRepository.save(user);
    return user;
  }
}
