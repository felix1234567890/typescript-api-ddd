import type { IBook } from '../../books/entities/IBook';

export interface IReview {
  id: number;
  text: string;
  bookId: number;
  book?: IBook;
  createdAt: Date;
  updatedAt: Date;
}
