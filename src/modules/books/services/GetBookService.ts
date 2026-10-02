import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import { IBook } from '../entities/IBook';
import { IBookRepository } from '../repositories/IBookRepository';

@injectable()
export class GetBookService {
  constructor(@inject('BookRepository') private bookRepository: IBookRepository) {}

  public async execute(id: number): Promise<IBook> {
    const book = await this.bookRepository.findById(id, { withAuthor: true });
    if (!book) {
      throw new AppError('Not found', 401);
    }
    return book;
  }
}
