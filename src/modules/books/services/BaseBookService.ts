import { Repository } from 'typeorm';
import { dataSource } from '../../../data-source';
import { Book } from '../infra/typeorm/entity';

export class BaseBookService {
  protected bookRepository: Repository<Book>;
  constructor() {
    this.bookRepository = dataSource.getRepository(Book);
  }
}
