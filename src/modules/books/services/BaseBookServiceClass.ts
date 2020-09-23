import { getRepository, Repository } from 'typeorm';
import { Book } from '../infra/typeorm/entity';

export class BaseBookService {
  protected bookRepository: Repository<Book>;
  constructor() {
    this.bookRepository = getRepository(Book);
  }
}
