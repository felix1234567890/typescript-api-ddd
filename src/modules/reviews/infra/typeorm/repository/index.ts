import { getRepository, Repository } from 'typeorm';
import AppError from '../../../../../shared/errors/AppError';
import { CreateReviewDTO } from '../../../dtos/CreateReviewDTO';
import { IReviewRepository } from '../../../repositories/IReviewRepository';
import { Review } from '../entity';

class ReviewRepository implements IReviewRepository {
  private ormRepository: Repository<Review>;
  constructor() {
    this.ormRepository = getRepository(Review);
  }

  public async findById(id: number): Promise<Review> {
    const review = await this.ormRepository.findOne({ id });
    if (!review) {
      throw new AppError('Review not found');
    }
    return review;
  }

  public async findAll(): Promise<Review[]> {
    return await this.ormRepository.find();
  }

  public async create({ bookId, text }: CreateReviewDTO): Promise<Review> {
    const review = this.ormRepository.create({ bookId, text });
    await this.ormRepository.save(review);
    return review;
  }

  public async update(review: Review): Promise<Review> {
    await this.ormRepository.save(review);
    return review;
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
export default ReviewRepository;