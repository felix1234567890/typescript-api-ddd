import { injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import { CreateBookDTO } from '../dtos/CreateBookDTO';
import { Book } from '../infra/typeorm/entity';
import { BaseBookService } from './BaseBookService';

@injectable()
export class CreateBookService extends BaseBookService {
  public async execute({ title, description, authorId }: CreateBookDTO): Promise<Book> {
    const titleExists = await this.bookRepository.findOne({ where: { title } });
    if (titleExists) {
      throw new AppError('Cannot add book with already existing title');
    }
    const book = this.bookRepository.create({ title, description, authorId });
    await this.bookRepository.save(book);
    return book;
  }
}
