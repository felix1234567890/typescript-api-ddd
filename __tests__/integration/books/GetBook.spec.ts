import { DataSource, Repository } from 'typeorm';
import request from 'supertest';
import app from '../../../src/shared/infra/http/app';
import { Book } from '../../../src/modules/books/infra/typeorm/entity';
import { User } from '../../../src/modules/users/infra/typeorm/entity';
import { dataSource } from '../../../src/data-source';

let bookRepository: Repository<Book>;
let userRepository: Repository<User>;

describe('Get book', () => {
  beforeAll(async () => {
    // connection = await dataSource.initialize();
    bookRepository = dataSource.getRepository(Book);
    userRepository = dataSource.getRepository(User);
  });
  afterEach(async () => {
    await dataSource.query('DELETE FROM books');
    await dataSource.query('DELETE FROM users');
  });
  afterAll(async () => {
    // await connection.destroy();
  });

  it('should get book by id', async () => {
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
    const response = await request(app).get(`/books/${bookId}`);
    expect(response.status).toBe(200);
    expect(response.body.title).toMatch('Harry Potter');
  });
});
