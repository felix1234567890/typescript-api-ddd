import { Connection, createConnection } from 'typeorm';
import request from 'supertest';
import app from '../../../src/shared/infra/http/app';

let connection: Connection;

describe('Get books', () => {
  beforeAll(async () => {
    connection = await createConnection();
  });
  afterEach(async () => {
    await connection.query('DELETE FROM users');
    await connection.query('DELETE FROM books');
  });
  afterAll(async () => {
    await connection.close();
  });

  it('should have no books on first request ', async () => {
    const response = await request(app).get('/books');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(0);
  });
});
