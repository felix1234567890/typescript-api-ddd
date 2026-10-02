import type { IUser } from '../../users/entities/IUser';

export interface IBook {
  id: number;
  title: string;
  description: string;
  authorId: number;
  author?: IUser;
  createdAt: Date;
  updatedAt: Date;
}
