import { container } from 'tsyringe';
import BookRepository from '../../modules/books/infra/typeorm/repository';
import { IBookRepository } from '../../modules/books/repositories/IBookRepository';
import ReviewRepository from '../../modules/reviews/infra/typeorm/repository';
import { IReviewRepository } from '../../modules/reviews/repositories/IReviewRepository';
import UserRepository from '../../modules/users/infra/typeorm/repository';
import { BcryptHashProvider } from '../../modules/users/providers/BCryptHashProvider';
import { IHashProvider } from '../../modules/users/providers/IHashProvider';
import { ITokenProvider } from '../../modules/users/providers/ITokenProvider';
import { JwtTokenProvider } from '../../modules/users/providers/JwtTokenProvider';
import { IUserRepository } from '../../modules/users/repositories/IUserRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IBookRepository>('BookRepository', BookRepository);
container.registerSingleton<IReviewRepository>('ReviewRepository', ReviewRepository);
container.registerSingleton<IHashProvider>('HashProvider', BcryptHashProvider);
container.registerSingleton<ITokenProvider>('TokenProvider', JwtTokenProvider);
