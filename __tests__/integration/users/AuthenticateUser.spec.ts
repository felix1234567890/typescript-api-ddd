import request from 'supertest';
import app from '../../../src/shared/infra/http/server';
import { dataSource } from '../../../src/data-source';
import { DataSource } from 'typeorm';

describe('Get user', () => {
  let connection:DataSource
  beforeAll(async () => {
     connection = await dataSource.initialize()
  });
  beforeEach(async () => {
    await request(app).post('/users').send({
      name: 'Marko Lukin',
      email: 'franelukin10@gmail.com',
      password: 'tojeto123',
    });
  });
  afterEach(async () => {
    await dataSource.query('DELETE FROM users');
  });
  afterAll(async () => {
     await connection.destroy();
     app.close()
  });
  it('should be able to authenticate a user with valid credentials', async () => {
    const response = await request(app).post('/users/login').send({
      email: 'franelukin10@gmail.com',
      password: 'tojeto123',
    });
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(
      expect.objectContaining({
        token: expect.any(String),
        user: expect.any(Object),
      }),
    );
  });
  it('should not be able to authenticate a user with the wrong e-mail', async () => {
    const response = await request(app).post('/users/login').send({
      email: 'franeluki20@gmail.com',
      password: 'tojeto123',
    });
    expect(response.status).toBe(401);
    expect(response.body).toMatchObject(
      expect.objectContaining({
        message: expect.stringMatching('User with provided email not found'),
      }),
    );
  });
  it('should not be able to authenticate a user with the wrong password', async () => {
    const response = await request(app).post('/users/login').send({
      email: 'franelukin10@gmail.com',
      password: 'tojeto1234',
    });
    expect(response.status).toBe(401);
    expect(response.body).toMatchObject(
      expect.objectContaining({
        message: expect.stringMatching('Wrong password provided'),
      }),
    );
  });
});
