import { injectable } from 'tsyringe';
import { GetUsersDTO } from '../dtos/GetUsersDTO';
import { User } from '../infra/typeorm/entity';
import { BaseUserService } from './BaseUserService';

@injectable()
export class GetUsersService extends BaseUserService {
  public async execute({ skip, limit }: GetUsersDTO): Promise<User[]> {
    let users;
    if (skip && limit) {
      users = await this.userRepository.find({ skip, take: limit });
    } else {
      users = await this.userRepository.find({ relations: ['books'] });
    }
    return users;
  }
}
