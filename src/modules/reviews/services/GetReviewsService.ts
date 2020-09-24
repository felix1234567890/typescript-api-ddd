import { inject, injectable } from 'tsyringe';
import { Review } from '../infra/typeorm/entity';
import { IReviewRepository } from '../repositories/IReviewRepository';

@injectable()
export class GetReviewsService {
  constructor(@inject('ReviewRepository') private reviewRepository: IReviewRepository) {}
  public async execute(): Promise<Review[]> {
    return await this.reviewRepository.findAll();
  }
}
