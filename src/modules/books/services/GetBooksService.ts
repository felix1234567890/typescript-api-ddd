import { inject, injectable } from 'tsyringe';
import { IBook } from '../entities/IBook';
import { IBookRepository } from '../repositories/IBookRepository';

@injectable()
export class GetBooksService {
  constructor(@inject('BookRepository') private bookRepository: IBookRepository) {}

  public execute(): Promise<IBook[]> {
    return this.bookRepository.findAll();
  }
}
