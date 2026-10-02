import type { IBook } from '../../books/entities/IBook';

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  books?: IBook[];
  createdAt: Date;
  updatedAt: Date;
}
