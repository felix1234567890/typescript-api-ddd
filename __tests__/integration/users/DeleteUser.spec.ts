import { Connection, createConnection, getRepository, Repository } from 'typeorm';
import { User } from '../../../src/modules/users/infra/typeorm/entity';
import request from 'supertest';
import app from '../../../src/shared/infra/http/app';
import getToken from '../../helpers/getToken';

let connection: Connection;
let userRepository: Repository<User>;
let token: string;

describe('Delete user', () => {
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
    token = await getToken('franelukin10@gmail.com', 'tojeto123');
  });
  afterEach(async () => {
    await connection.query('DELETE FROM users');
  });
  afterAll(async () => {
    await connection.close();
  });
  it('should not be able to delete a user without token', async () => {
    const user = await userRepository.findOne({
      where: { email: 'franelukin10@gmail.com' },
    });
    if (user) {
      const response = await request(app).delete(`/users/${user.id}`);

      expect(response.status).toBe(401);
      expect(response.body.message).toMatch('Token missing');
    }
  });
  it('should not be able to delete a user with non-valid id', async () => {
    const response = await request(app).delete(`/users/aaaa`).set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body.validation).toMatchObject({
      params: expect.objectContaining({
        message: expect.stringMatching(`"id" must be a number`),
      }),
    });
  });
  it('should not be able to delete some other user', async () => {
    await request(app).post('/users').send({
      name: 'Ivo Ivic',
      email: 'ivoivic@gmail.com',
      password: 'jasamivo123',
    });
    const user = await userRepository.findOne({
      where: { email: 'ivoivic@gmail.com' },
    });
    if (user) {
      const response = await request(app).delete(`/users/${user.id}`).set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(401);
      expect(response.body.message).toMatch('You cannot delete other users');
    }
  });
});
