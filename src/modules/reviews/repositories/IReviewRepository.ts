import { CreateReviewDTO } from '../dtos/CreateReviewDTO';
import { IReview } from '../entities/IReview';

export interface IReviewRepository {
  findById(id: number): Promise<IReview | undefined>;
  findAll(): Promise<IReview[]>;
  create(data: Omit<CreateReviewDTO, 'userId'>): Promise<IReview>;
  update(review: IReview): Promise<IReview>;
  delete(id: number): Promise<void>;
}
