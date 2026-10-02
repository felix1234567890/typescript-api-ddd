import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import { UpdateBookDTO } from '../dtos/UpdateBookDTO';
import { IBook } from '../entities/IBook';
import { IBookRepository } from '../repositories/IBookRepository';

@injectable()
export class UpdateBookService {
  constructor(@inject('BookRepository') private bookRepository: IBookRepository) {}

  public async execute({ id, title, description, authorId }: UpdateBookDTO): Promise<IBook> {
    const book = await this.bookRepository.findById(id);
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
    return this.bookRepository.save(book);
  }
}
