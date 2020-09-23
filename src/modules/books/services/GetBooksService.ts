import { injectable } from 'tsyringe';
import { Book } from '../infra/typeorm/entity';
import { BaseBookService } from './BaseBookService';

@injectable()
export class GetBooksService extends BaseBookService {
  public async execute(): Promise<Book[]> {
    return await this.bookRepository.find({ relations: ['author'] });
  }
}
