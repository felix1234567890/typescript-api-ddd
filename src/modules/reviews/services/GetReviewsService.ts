import { inject, injectable } from 'tsyringe';
import { IReview } from '../entities/IReview';
import { IReviewRepository } from '../repositories/IReviewRepository';

@injectable()
export class GetReviewsService {
  constructor(@inject('ReviewRepository') private reviewRepository: IReviewRepository) {}

  public execute(): Promise<IReview[]> {
    return this.reviewRepository.findAll();
  }
}
