import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import { IBookRepository } from '../repositories/IBookRepository';

@injectable()
export class DeleteBookService {
  constructor(@inject('BookRepository') private bookRepository: IBookRepository) {}

  public async execute(id: number, userId: number): Promise<void> {
    const book = await this.bookRepository.findById(id);
    if (!book) {
      throw new AppError('Book not found', 401);
    }
    if (book.authorId !== userId) {
      throw new AppError('You cannot delete someone others book', 401);
    }
    await this.bookRepository.delete(id);
  }
}
