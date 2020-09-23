import { injectable } from 'tsyringe';
import { getRepository, Repository } from 'typeorm';
import AppError from '../../../shared/errors/AppError';
import { CreateBookDTO } from '../dtos/CreateBookDTO';
import { Book } from '../infra/typeorm/entity';

@injectable()
export class CreateBookService {
  private bookRepository: Repository<Book>;
  constructor() {
    this.bookRepository = getRepository(Book);
  }

  public async execute({ title, description, authorId }: CreateBookDTO): Promise<Book> {
    const titleExists = await this.bookRepository.findOne({ where: { title } });
    if (titleExists) {
      throw new AppError('Cannot add book with already existing title');
    }
    const book = await this.bookRepository.create({ title, description, authorId });
    await this.bookRepository.save(book);
    return book;
  }
}
