import { Connection, createConnection, getRepository, Repository } from 'typeorm';
import { User } from '../../../src/modules/users/infra/typeorm/entity';
import request from 'supertest';
import app from '../../../src/shared/infra/http/app';

let connection: Connection;
let userRepository: Repository<User>;

describe('Get user', () => {
  beforeAll(async () => {
    connection = await createConnection();
    userRepository = getRepository(User);
  });
  beforeEach(async () => {
    await request(app).post('/users').send({
      name: 'Marko Lukin',
      email: 'franelukin10@gmail.com',
      password: 'tojeto123',
    });
  });
  afterEach(async () => {
    await connection.query('DELETE FROM users');
  });
  afterAll(async () => {
    await connection.close();
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
});
