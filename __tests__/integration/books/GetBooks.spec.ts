import { Connection, Repository, createConnection, getRepository } from 'typeorm';
import request from 'supertest';
import app from '../../../src/shared/infra/http/app';
import { Book } from '../../../src/modules/books/infra/typeorm/entity';

let connection: Connection;
let bookRepository: Repository<Book>;

describe('Get users', () => {
  beforeAll(async () => {
    connection = await createConnection();
    bookRepository = getRepository(Book);
  });
  afterEach(async () => {
    await connection.query('DELETE FROM users');
  });
  afterAll(async () => {
    await connection.close();
  });

  it('should have no users on first request ', async () => {
    const response = await request(app).get('/books');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(0);
  });
});
