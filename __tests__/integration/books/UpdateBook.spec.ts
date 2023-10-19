import { DataSource, Repository } from 'typeorm';
import request from 'supertest';
import app from '../../../src/shared/infra/http/server';
import { Book } from '../../../src/modules/books/infra/typeorm/entity';
import getToken from '../../helpers/getToken';
import { dataSource } from '../../../src/data-source';

let bookRepository: Repository<Book>;
let token: string;
let userId: number;

describe('Update book', () => {
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
     await connection.destroy();
     app.close()
  });

  it('should update book by id', async () => {
    const { id: bookId } = await bookRepository.save(
      bookRepository.create({
        title: 'Harry Potter',
        description: 'This is description of a book I have read',
        authorId: userId,
      }),
    );
    console.log(bookId);
    const response = await request(app)
      .put(`/books/${bookId}`)
      .send({ title: 'Lord of the rings' })
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body.title).toMatch('Lord of the rings');
    expect(response.body.description).toMatch('This is description of a book I have read');
  });
});
