import { Connection, createConnection, getRepository, Repository } from 'typeorm';
import request from 'supertest';
import app from '../../../src/shared/infra/http/app';
import { Book } from '../../../src/modules/books/infra/typeorm/entity';
import { User } from '../../../src/modules/users/infra/typeorm/entity';
import { Review } from '../../../src/modules/reviews/infra/typeorm/entity';

let connection: Connection;
let bookRepository: Repository<Book>;
let userRepository: Repository<User>;
let reviewRepository: Repository<Review>;

describe('Get reviews', () => {
  beforeAll(async () => {
    connection = await createConnection();
    bookRepository = getRepository(Book);
    userRepository = getRepository(User);
    reviewRepository = getRepository(Review);
  });

  afterEach(async () => {
    await connection.query('DELETE FROM reviews');
    await connection.query('DELETE FROM books');
    await connection.query('DELETE FROM users');
  });
  afterAll(async () => {
    await connection.close();
  });

  it('should have reviews after creation', async () => {
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
    await reviewRepository.save(
      reviewRepository.create({
        bookId,
        text: 'This is review of a book',
      }),
    );
    const response = await request(app).get('/reviews');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });
});
