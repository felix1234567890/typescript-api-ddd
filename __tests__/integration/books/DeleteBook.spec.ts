import { DataSource, Repository } from 'typeorm';
import request from 'supertest';
import app from '../../../src/shared/infra/http/server';
import { Book } from '../../../src/modules/books/infra/typeorm/entity';
import getToken from '../../helpers/getToken';
import { dataSource } from '../../../src/data-source';

let bookRepository: Repository<Book>;
let token: string;
let userId: number;

describe('Delete book', () => {
  let connection:DataSource
  beforeAll(async () => {
    connection = await dataSource.initialize();
    bookRepository = dataSource.getRepository(Book);
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
    await dataSource.query('DELETE FROM books');
    await dataSource.query('DELETE FROM users');
  });
  afterAll(async () => {
    //  await connection.destroy();
     app.close()
  });

  it('should delete book by id', async () => {
    const { id: bookId } = await bookRepository.save(
      bookRepository.create({
        title: 'Harry Potter',
        description: 'This is description of a book I have read',
        authorId: userId,
      }),
    );
    const response = await request(app).delete(`/books/${bookId}`).set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(204);
  });
  it('should not delete book with wrong id', async () => {
    const response = await request(app).delete('/books/1').set('Authorization', `Bearer ${token}`);
    expect(response.body.message).toMatch('Book not found');
  });
  it('should not delete book with invalid id', async () => {
    const response = await request(app).delete('/books/a').set('Authorization', `Bearer ${token}`);
    expect(response.body.validation).toMatchObject({
      params: expect.objectContaining({
        message: expect.stringMatching(`"id" must be a number`),
      }),
    });
  });
});
