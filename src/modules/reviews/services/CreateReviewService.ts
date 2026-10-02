import { inject, injectable } from 'tsyringe';
import AppError from '../../../shared/errors/AppError';
import { IBookRepository } from '../../books/repositories/IBookRepository';
import { CreateReviewDTO } from '../dtos/CreateReviewDTO';
import { IReview } from '../entities/IReview';
import { IReviewRepository } from '../repositories/IReviewRepository';

@injectable()
export class CreateReviewService {
  constructor(
    @inject('ReviewRepository') private reviewRepository: IReviewRepository,
    @inject('BookRepository') private bookRepository: IBookRepository,
  ) {}

  public async execute({ text, bookId, userId }: CreateReviewDTO): Promise<IReview> {
    const book = await this.bookRepository.findById(bookId);
    if (!book) {
      throw new AppError('Cannot create review for a book that does not exist');
    }
    if (book.authorId === userId) {
      throw new AppError('You can not create review for your own book', 401);
    }
    return this.reviewRepository.create({ text, bookId });
  }
}
