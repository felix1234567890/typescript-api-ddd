import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { GetReviewsService } from '../../../services/GetReviewsService';

export class ReviewController {
  public async index(request: Request, response: Response): Promise<Response> {
    const getReviews = container.resolve(GetReviewsService);
    const reviews = await getReviews.execute();
    return response.status(200).json(reviews);
  }
}
