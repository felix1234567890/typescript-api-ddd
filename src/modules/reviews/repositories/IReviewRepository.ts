import { CreateReviewDTO } from '../dtos/CreateReviewDTO';
import { IReview } from '../entities/IReview';

export type CreateReviewData = Pick<CreateReviewDTO, 'bookId' | 'text'>;

export interface IReviewRepository {
  findById(id: number): Promise<IReview | null>;
  /** All reviews, each with their book and the book's author. */
  findAll(): Promise<IReview[]>;
  create(data: CreateReviewData): Promise<IReview>;
  update(review: IReview): Promise<IReview>;
  delete(id: number): Promise<void>;
}
