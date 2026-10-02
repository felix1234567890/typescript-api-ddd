import { IReview } from '../../src/modules/reviews/entities/IReview';
import { CreateReviewData, IReviewRepository } from '../../src/modules/reviews/repositories/IReviewRepository';

export class FakeReviewRepository implements IReviewRepository {
  private reviews: IReview[] = [];
  private nextId = 1;

  public async findById(id: number): Promise<IReview | null> {
    return this.reviews.find(review => review.id === id) ?? null;
  }

  public async findAll(): Promise<IReview[]> {
    return this.reviews;
  }

  public async create({ bookId, text }: CreateReviewData): Promise<IReview> {
    const review: IReview = { id: this.nextId++, bookId, text, createdAt: new Date(), updatedAt: new Date() };
    this.reviews.push(review);
    return review;
  }

  public async update(review: IReview): Promise<IReview> {
    const index = this.reviews.findIndex(r => r.id === review.id);
    this.reviews[index] = review;
    return review;
  }

  public async delete(id: number): Promise<void> {
    this.reviews = this.reviews.filter(review => review.id !== id);
  }
}
