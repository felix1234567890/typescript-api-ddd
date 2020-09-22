import { classToClass } from 'class-transformer';
import { injectable } from 'tsyringe';
import { getRepository, Repository } from 'typeorm';
import { GetUsersDTO } from '../dtos/GetUsersDTO';
import { User } from '../infra/typeorm/entity';

@injectable()
export class GetUsersService {
  private userRepository: Repository<User>;
  constructor() {
    this.userRepository = getRepository(User);
  }

  public async execute({ skip, limit }: GetUsersDTO): Promise<User[]> {
    let users;
    if (skip && limit) {
      users = await this.userRepository.find({ skip, take: limit });
    } else {
      users = await this.userRepository.find();
    }
    return classToClass(users);
  }
}
