import { Repository } from 'typeorm';
import { dataSource } from '../../../../../data-source';
import { CreateBookDTO } from '../../../dtos/CreateBookDTO';
import { IBook } from '../../../entities/IBook';
import { IBookRepository } from '../../../repositories/IBookRepository';
import { Book } from '../entity';

class BookRepository implements IBookRepository {
  private ormRepository: Repository<Book>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Book);
  }

  public findById(id: number, { withAuthor = false } = {}): Promise<Book | null> {
    return this.ormRepository.findOne({ where: { id }, relations: { author: withAuthor } });
  }

  public findByTitle(title: string): Promise<Book | null> {
    return this.ormRepository.findOne({ where: { title } });
  }

  public findAll(): Promise<Book[]> {
    return this.ormRepository.find({ relations: { author: true } });
  }

  public async create(data: CreateBookDTO): Promise<Book> {
    const book = this.ormRepository.create(data);
    return this.ormRepository.save(book);
  }

  public save(book: IBook): Promise<Book> {
    return this.ormRepository.save(book);
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
export default BookRepository;
