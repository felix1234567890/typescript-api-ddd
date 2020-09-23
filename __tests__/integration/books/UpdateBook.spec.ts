import { Connection, createConnection, getRepository, Repository } from 'typeorm';
import request from 'supertest';
import app from '../../../src/shared/infra/http/app';
import { Book } from '../../../src/modules/books/infra/typeorm/entity';
import getToken from '../../helpers/getToken';

let connection: Connection;
let bookRepository: Repository<Book>;
let token: string;
let userId: number;

describe('Update book', () => {
  beforeAll(async () => {
    connection = await createConnection();
    bookRepository = getRepository(Book);
  });
  beforeEach(async () => {
    const response = await request(app).post('/users').send({
      name: 'Marko Lukin',
      email: 'franelukin10@gmail.com',
      password: 'tojeto123',
    });
    token = await getToken('franelukin10@gmail.com', 'tojeto123');
    userId = response.body.id;
  });
  afterEach(async () => {
    await connection.query('DELETE FROM books');
    await connection.query('DELETE FROM users');
  });
  afterAll(async () => {
    await connection.close();
  });

  it('should update book by id', async () => {
    const { id: bookId } = await bookRepository.save(
      bookRepository.create({
        title: 'Harry Potter',
        description: 'This is description of a book I have read',
        authorId: userId,
      }),
    );
    const response = await request(app)
      .put(`/books/${bookId}`)
      .send({ title: 'Lord of the rings' })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.title).toMatch('Lord of the rings');
    expect(response.body.description).toMatch('This is description of a book I have read');
  });
});
