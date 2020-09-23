import { injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import { BaseBookService } from './BaseBookServiceClass';

@injectable()
export class DeleteBookService extends BaseBookService {
  public async execute(id: number, userId: string): Promise<void> {
    const book = await this.bookRepository.findOne({ id }, { relations: ['author'] });
    if (!book) {
      throw new AppError('Book not found', 401);
    }
    if (book.authorId !== parseInt(userId)) {
      throw new AppError('You cannot delete someone others book', 401);
    }
    await this.bookRepository.delete(book);
  }
}
