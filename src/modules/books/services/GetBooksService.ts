import { injectable } from 'tsyringe';
import { getRepository, Repository } from 'typeorm';
import { Book } from '../infra/typeorm/entity';

@injectable()
export class GetBooksService {
  private bookRepository: Repository<Book>;
  constructor() {
    this.bookRepository = getRepository(Book);
  }

  public async execute(): Promise<Book[]> {
    return await this.bookRepository.find();
  }
}
