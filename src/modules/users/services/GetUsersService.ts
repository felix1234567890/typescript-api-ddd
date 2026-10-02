import { inject, injectable } from 'tsyringe';
import { GetUsersDTO } from '../dtos/GetUsersDTO';
import { IUser } from '../entities/IUser';
import { IUserRepository } from '../repositories/IUserRepository';

@injectable()
export class GetUsersService {
  constructor(@inject('UserRepository') private userRepository: IUserRepository) {}

  public execute({ skip, limit }: GetUsersDTO): Promise<IUser[]> {
    if (skip && limit) {
      return this.userRepository.findPage({ skip, limit });
    }
    return this.userRepository.findAll();
  }
}
