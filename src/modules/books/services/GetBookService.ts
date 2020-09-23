import { injectable } from 'tsyringe';
import { getRepository, Repository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import { Book } from '../infra/typeorm/entity';

@injectable()
export class GetBookService {
  private bookRepository: Repository<Book>;
  constructor() {
    this.bookRepository = getRepository(Book);
  }

  public async execute(id: number): Promise<Book | undefined> {
    const book = await this.bookRepository.findOne({ id }, { relations: ['author'] });
    if (!book) {
      throw new AppError('Not found', 401);
    }
    return book;
  }
}
