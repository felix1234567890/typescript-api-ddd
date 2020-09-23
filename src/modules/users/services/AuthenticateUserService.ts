import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import { LoginUserDTO } from '../dtos/LoginUserDTO';
import { User } from '../infra/typeorm/entity';
import { BcryptHashProvider } from '../providers/BCryptHashProvider';
import { sign } from 'jsonwebtoken';
import { classToClass } from 'class-transformer';
import { BaseUserService } from './BaseUserService';

interface Response {
  user: User;
  token: string;
}

@injectable()
export class AuthenticateUserService extends BaseUserService {
  constructor(
    @inject('HashProvider')
    private hashProvider: BcryptHashProvider,
  ) {
    super();
  }

  public async execute({ email, password }: LoginUserDTO): Promise<Response> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new AppError('User with provided email not found', 401);
    }
    const passwordMatch = await this.hashProvider.compareHash(password, user.password);
    if (!passwordMatch) {
      throw new AppError('Wrong password provided', 401);
    }
    const secret = <string>process.env.JWT_SECRET;
    const token = sign({}, secret, { subject: user.id.toString(), expiresIn: '6h' });
    return {
      user: classToClass(user),
      token,
    };
  }
}
