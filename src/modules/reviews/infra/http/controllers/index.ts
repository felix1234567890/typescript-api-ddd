import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateReviewService } from '../../../services/CreateReviewService';
import { GetReviewService } from '../../../services/GetReviewService';
import { GetReviewsService } from '../../../services/GetReviewsService';

export class ReviewController {
  public async index(request: Request, response: Response): Promise<Response> {
    const getReviews = container.resolve(GetReviewsService);
    const reviews = await getReviews.execute();
    return response.status(200).json(reviews);
  }

  public async review(request: Request, response: Response): Promise<Response> {
    const getReview = container.resolve(GetReviewService);
    const review = await getReview.execute(Number(request.params.id));
    return response.status(200).json(review);
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { text, bookId } = request.body;
    const storeReview = container.resolve(CreateReviewService);
    const review = await storeReview.execute({ text, bookId, userId: request.user.id });
    return response.status(201).json(review);
  }
}
