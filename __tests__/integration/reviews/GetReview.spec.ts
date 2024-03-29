import { DataSource, Repository } from 'typeorm';
import request from 'supertest';
import app from '../../../src/shared/infra/http/server';
import { Book } from '../../../src/modules/books/infra/typeorm/entity';
import { User } from '../../../src/modules/users/infra/typeorm/entity';
import { Review } from '../../../src/modules/reviews/infra/typeorm/entity';
import { dataSource } from '../../../src/data-source';

let bookRepository: Repository<Book>;
let userRepository: Repository<User>;
let reviewRepository: Repository<Review>;

describe('Get review', () => {
  beforeAll(async () => {
    await (await dataSource.initialize()).synchronize(true)
    bookRepository = dataSource.getRepository(Book);
    userRepository = dataSource.getRepository(User);
    reviewRepository = dataSource.getRepository(Review);
  });

  afterEach(async () => {
    await dataSource.query('DELETE FROM reviews');
    await dataSource.query('DELETE FROM books');
    await dataSource.query('DELETE FROM users');
  });
  afterAll(async () => {
    await dataSource.destroy()
     app.close()
  });

  it('should get review by id', async () => {
    const { id } = await userRepository.save(
      userRepository.create({ name: 'Marko Lukin', email: 'franelukin10@gmail.com', password: 'tojeto123' }),
    );
    const { id: bookId } = await bookRepository.save(
      bookRepository.create({
        title: 'Harry Potter',
        description: 'This is description of a book I have read',
        authorId: id,
      }),
    );
    const { id: reviewId } = await reviewRepository.save(
      reviewRepository.create({
        bookId,
        text: 'This is review of a book',
      }),
    );
    const response = await request(app).get(`/reviews/${reviewId}`);
    expect(response.status).toBe(200);
  });
});
