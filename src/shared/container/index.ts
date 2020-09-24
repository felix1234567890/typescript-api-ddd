import '../../modules/users/providers';
import ReviewRepository from '../../modules/reviews/infra/typeorm/repository';
import { container } from 'tsyringe';
import { IReviewRepository } from '../../modules/reviews/repositories/IReviewRepository';

container.registerSingleton<IReviewRepository>('ReviewRepository', ReviewRepository);
