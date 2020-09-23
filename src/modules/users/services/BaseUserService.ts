import { getRepository, Repository } from 'typeorm';
import { User } from '../infra/typeorm/entity';

export class BaseUserService {
  protected userRepository: Repository<User>;
  constructor() {
    this.userRepository = getRepository(User);
  }
}
