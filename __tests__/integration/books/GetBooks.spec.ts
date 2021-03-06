import { Connection, createConnection, getRepository, Repository } from 'typeorm';
import request from 'supertest';
import app from '../../../src/shared/infra/http/app';
import { Book } from '../../../src/modules/books/infra/typeorm/entity';
import { User } from '../../../src/modules/users/infra/typeorm/entity';

let connection: Connection;
let bookRepository: Repository<Book>;
let userRepository: Repository<User>;

describe('Get books', () => {
  beforeAll(async () => {
    connection = await createConnection();
    bookRepository = getRepository(Book);
    userRepository = getRepository(User);
  });

  afterEach(async () => {
    await connection.query('DELETE FROM books');
    await connection.query('DELETE FROM users');
  });
  afterAll(async () => {
    await connection.close();
  });

  it('should have no books on first request ', async () => {
    const response = await request(app).get('/books');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(0);
  });
  it('should have books after creation ', async () => {
    const { id } = await userRepository.save(
      userRepository.create({ name: 'Marko Lukin', email: 'franelukin10@gmail.com', password: 'tojeto123' }),
    );
    await bookRepository.save(
      bookRepository.create({
        title: 'Harry Potter',
        description: 'This is description of a book I have read',
        authorId: id,
      }),
    );
    const response = await request(app).get('/books');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });
});
