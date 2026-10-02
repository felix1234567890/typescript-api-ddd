import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import { LoginUserDTO } from '../dtos/LoginUserDTO';
import { IUser } from '../entities/IUser';
import { IHashProvider } from '../providers/IHashProvider';
import { ITokenProvider } from '../providers/ITokenProvider';
import { IUserRepository } from '../repositories/IUserRepository';

interface Response {
  user: IUser;
  token: string;
}

@injectable()
export class AuthenticateUserService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('HashProvider') private hashProvider: IHashProvider,
    @inject('TokenProvider') private tokenProvider: ITokenProvider,
  ) {}

  public async execute({ email, password }: LoginUserDTO): Promise<Response> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('User with provided email not found', 401);
    }
    const passwordMatch = await this.hashProvider.compareHash(password, user.password);
    if (!passwordMatch) {
      throw new AppError('Wrong password provided', 401);
    }
    return { user, token: this.tokenProvider.sign(user.id) };
  }
}
