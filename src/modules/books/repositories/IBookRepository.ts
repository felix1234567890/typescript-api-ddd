import { CreateBookDTO } from '../dtos/CreateBookDTO';
import { IBook } from '../entities/IBook';

export interface IBookRepository {
  findById(id: number, options?: { withAuthor?: boolean }): Promise<IBook | null>;
  findByTitle(title: string): Promise<IBook | null>;
  /** All books, each with their author. */
  findAll(): Promise<IBook[]>;
  create(data: CreateBookDTO): Promise<IBook>;
  save(book: IBook): Promise<IBook>;
  delete(id: number): Promise<void>;
}
