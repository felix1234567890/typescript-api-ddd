import { Connection, createConnection } from 'typeorm';
import request from 'supertest';
import app from '../../../src/shared/infra/http/app';
import getToken from '../../helpers/getToken';

let connection: Connection;
let token: string;

describe('Create book', () => {
  beforeAll(async () => {
    connection = await createConnection();
  });
  beforeEach(async () => {
    await request(app).post('/users').send({
      name: 'Marko Lukin',
      email: 'franelukin10@gmail.com',
      password: 'tojeto123',
    });
    token = await getToken('franelukin10@gmail.com', 'tojeto123');
  });
  afterEach(async () => {
    await connection.query('DELETE FROM books');
    await connection.query('DELETE FROM users');
  });
  afterAll(async () => {
    await connection.close();
  });

  it('should be able to create a book ', async () => {
    const response = await request(app)
      .post('/books')
      .send({
        title: 'Harry Potter',
        description: 'This is description of a book I have read',
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(
      expect.objectContaining({
        authorId: expect.any(Number),
      }),
    );
  });
  it('should not be able to create a book without token', async () => {
    const response = await request(app).post('/books').send({
      title: 'Harry Potter',
      description: 'This is description of a book I have read',
    });

    expect(response.status).toBe(401);
    expect(response.body.message).toMatch('Token missing');
  });
  it('should not be able to create a book without title', async () => {
    const response = await request(app)
      .post('/books')
      .send({
        description: 'This is description of a book I have read',
      })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body.validation).toMatchObject({
      body: expect.objectContaining({
        message: expect.stringMatching('Title is required'),
      }),
    });
  });
});
