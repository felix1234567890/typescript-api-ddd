import { injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import { Book } from '../infra/typeorm/entity';
import { BaseBookService } from './BaseBookService';

@injectable()
export class GetBookService extends BaseBookService {
  public async execute(id: number): Promise<Book | undefined> {
    const book = await this.bookRepository.findOne({ where: { id }, relations: ['author'] });
    if (!book) {
      throw new AppError('Not found', 401);
    }
    return book;
  }
}
