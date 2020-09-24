import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import { Review } from '../infra/typeorm/entity';
import { IReviewRepository } from '../repositories/IReviewRepository';

@injectable()
export class GetReviewService {
  constructor(@inject('ReviewRepository') private reviewRepository: IReviewRepository) {}
  public async execute(id: number): Promise<Review | undefined> {
    const review = await this.reviewRepository.findById(id);
    if (!review) {
      throw new AppError('Review not found', 401);
    }
    return review;
  }
}
