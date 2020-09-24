import { CreateReviewDTO } from '../dtos/CreateReviewDTO';
import FakeReview from '../entities/FakeReview';
import { IReview } from '../entities/IReview';
import { IReviewRepository } from './IReviewRepository';

export class FakeReviewRepository implements IReviewRepository {
  private reviews: FakeReview[] = [];
  public async findById(id: number) {
    const review = this.reviews.find(review => review.id === id);
    return review;
  }

  public async findAll(): Promise<IReview[]> {
    return this.reviews;
  }

  public async create({ bookId, text }: CreateReviewDTO): Promise<IReview> {
    const review = new FakeReview();
    review.id = Math.floor(Math.random() * 100);
    review.bookId = bookId;
    review.text = text;
    review.createdAt = new Date();
    review.updatedAt = new Date();

    this.reviews.push(review);
    return review;
  }

  public async update(review: IReview): Promise<IReview> {
    const findReview = this.reviews.findIndex(rev => rev.id === review.id);
    this.reviews[findReview] = review;
    return review;
  }

  public async delete(id: number): Promise<void> {
    this.reviews = this.reviews.filter(review => review.id !== id);
  }
}
