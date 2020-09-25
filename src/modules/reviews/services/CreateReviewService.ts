import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import { BaseBookService } from '../../books/services/BaseBookService';
import { CreateReviewDTO } from '../dtos/CreateReviewDTO';
import { Review } from '../infra/typeorm/entity';
import { IReviewRepository } from '../repositories/IReviewRepository';

@injectable()
export class CreateReviewService extends BaseBookService {
  constructor(@inject('ReviewRepository') private reviewRepository: IReviewRepository) {
    super();
  }

  public async execute({ text, bookId, userId }: CreateReviewDTO): Promise<Review> {
    const book = await this.bookRepository.findOne({ where: { id: bookId } });
    if (!book) {
      throw new AppError('Cannot create review for a book that does not exist');
    }
    if (book.authorId === userId) {
      throw new AppError('You can not create review for your own book');
    }
    const review = await this.reviewRepository.create({ text, bookId });
    return review;
  }
}
