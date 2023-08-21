import {  Repository } from 'typeorm';
import { dataSource } from '../../../data-source';
import { User } from '../infra/typeorm/entity';

export class BaseUserService {
  protected userRepository: Repository<User>;
  constructor() {
    this.userRepository = dataSource.getRepository(User);
  }
}
