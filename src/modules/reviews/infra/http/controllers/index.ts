import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { GetReviewsService } from '../../../services/GetReviewsService';
import { GetReviewService } from '../../../services/GetReviewService';
import { ReviewGetDeleteDTO } from '../../../dtos/ReviewGetDeleteDTO';

export class ReviewController {
  public async index(request: Request, response: Response): Promise<Response> {
    const getReviews = container.resolve(GetReviewsService);
    const reviews = await getReviews.execute();
    return response.status(200).json(reviews);
  }

  public async review(request: Request, response: Response): Promise<Response> {
    const { id } = request.params as ReviewGetDeleteDTO;
    const getReview = container.resolve(GetReviewService);
    const review = await getReview.execute(id!);
    return response.status(200).json(review);
  }
}
