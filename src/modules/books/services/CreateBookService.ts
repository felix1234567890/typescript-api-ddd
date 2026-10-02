import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import { CreateBookDTO } from '../dtos/CreateBookDTO';
import { IBook } from '../entities/IBook';
import { IBookRepository } from '../repositories/IBookRepository';

@injectable()
export class CreateBookService {
  constructor(@inject('BookRepository') private bookRepository: IBookRepository) {}

  public async execute({ title, description, authorId }: CreateBookDTO): Promise<IBook> {
    if (await this.bookRepository.findByTitle(title)) {
      throw new AppError('Cannot add book with already existing title');
    }
    return this.bookRepository.create({ title, description, authorId });
  }
}
