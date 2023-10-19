import { DataSource } from 'typeorm';
import request from 'supertest';
import app from '../../../src/shared/infra/http/app';
import getToken from '../../helpers/getToken';
import { dataSource } from '../../../src/data-source';

let token: string;
let token2: string;
let bookId: number;
describe('Create review', () => {
  beforeAll(async () => {
    // connection = await dataSource.initialize();
  });
  beforeEach(async () => {
    await request(app).post('/users').send({
      name: 'Marko Lukin',
      email: 'franelukin10@gmail.com',
      password: 'tojeto123',
    });
    await request(app).post('/users').send({
      name: 'Marko Maric',
      email: 'franelukin20@gmail.com',
      password: 'tojeto123',
    });
    token = await getToken('franelukin10@gmail.com', 'tojeto123');
    token2 = await getToken('franelukin20@gmail.com', 'tojeto123');
    const response = await request(app)
      .post('/books')
      .send({
        title: 'Harry Potter',
        description: 'This is description of a book I have read',
      })
      .set('Authorization', `Bearer ${token}`);
    bookId = response.body.id;
  });
  afterEach(async () => {
    await dataSource.query('DELETE FROM reviews');
    await dataSource.query('DELETE FROM books');
    await dataSource.query('DELETE FROM users');
  });
  afterAll(async () => {
    // await connection.destroy();
  });

  it('should not be able to create a review for own book', async () => {
    const response = await request(app)
      .post('/reviews')
      .send({
        text: 'Harry Potter review',
        bookId,
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(401);
    expect(response.body.message).toMatch('You can not create review for your own book');
  });
  it('should be able to create a review', async () => {
    const response = await request(app)
      .post('/reviews')
      .send({
        text: 'Harry Potter review',
        bookId,
      })
      .set('Authorization', `Bearer ${token2}`);

    expect(response.status).toBe(201);
  });
});
