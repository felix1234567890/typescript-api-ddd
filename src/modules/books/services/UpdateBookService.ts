import { injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import { UpdateBookDTO } from '../dtos/UpdateBookDTO';
import { Book } from '../infra/typeorm/entity';
import { BaseBookService } from './BaseBookService';

@injectable()
export class UpdateBookService extends BaseBookService {
  public async execute({ id, title, description, authorId }: UpdateBookDTO): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) {
      throw new AppError('Book not found', 404);
    }
    if (book.authorId !== authorId) {
      throw new AppError('Cannot update others book', 404);
    }
    if (title) {
      book.title = title;
    }
    if (description) {
      book.description = description;
    }
    await this.bookRepository.save(book);
    return book;
  }
}
