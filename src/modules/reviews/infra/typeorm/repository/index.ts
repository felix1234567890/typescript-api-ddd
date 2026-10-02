import { Repository } from 'typeorm';
import { dataSource } from '../../../../../data-source';
import { IReview } from '../../../entities/IReview';
import { CreateReviewData, IReviewRepository } from '../../../repositories/IReviewRepository';
import { Review } from '../entity';

class ReviewRepository implements IReviewRepository {
  private ormRepository: Repository<Review>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Review);
  }

  public findById(id: number): Promise<Review | null> {
    return this.ormRepository.findOne({ where: { id } });
  }

  public findAll(): Promise<Review[]> {
    return this.ormRepository.find({ relations: { book: { author: true } } });
  }

  public async create(data: CreateReviewData): Promise<Review> {
    const review = this.ormRepository.create(data);
    return this.ormRepository.save(review);
  }

  public update(review: IReview): Promise<Review> {
    return this.ormRepository.save(review);
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
export default ReviewRepository;
