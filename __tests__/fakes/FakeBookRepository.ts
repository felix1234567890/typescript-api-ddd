import { CreateBookDTO } from '../../src/modules/books/dtos/CreateBookDTO';
import { IBook } from '../../src/modules/books/entities/IBook';
import { IBookRepository } from '../../src/modules/books/repositories/IBookRepository';

export class FakeBookRepository implements IBookRepository {
  private books: IBook[] = [];
  private nextId = 1;

  public async findById(id: number): Promise<IBook | null> {
    return this.books.find(book => book.id === id) ?? null;
  }

  public async findByTitle(title: string): Promise<IBook | null> {
    return this.books.find(book => book.title === title) ?? null;
  }

  public async findAll(): Promise<IBook[]> {
    return this.books;
  }

  public async create(data: CreateBookDTO): Promise<IBook> {
    const book: IBook = { id: this.nextId++, ...data, createdAt: new Date(), updatedAt: new Date() };
    this.books.push(book);
    return book;
  }

  public async save(book: IBook): Promise<IBook> {
    const index = this.books.findIndex(b => b.id === book.id);
    this.books[index] = book;
    return book;
  }

  public async delete(id: number): Promise<void> {
    this.books = this.books.filter(book => book.id !== id);
  }
}
