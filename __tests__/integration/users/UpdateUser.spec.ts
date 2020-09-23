import { Connection, createConnection, getRepository, Repository } from 'typeorm';
import { User } from '../../../src/modules/users/infra/typeorm/entity';
import request from 'supertest';
import app from '../../../src/shared/infra/http/app';
import getToken from '../../helpers/getToken';

let connection: Connection;
let userRepository: Repository<User>;
let token: string;

describe('Update user', () => {
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
  it('should not be able to update user without token', async () => {
    const user = await userRepository.findOne({
      where: { email: 'franelukin10@gmail.com' },
    });
    if (user) {
      const response = await request(app).put(`/users/${user.id}`).send({
        name: 'Frane Lukin',
      });
      expect(response.status).toBe(401);
      expect(response.body.message).toMatch('Token missing');
    }
  });
  it('should not be able to update with wrong password', async () => {
    const user = await userRepository.findOne({
      where: { email: 'franelukin10@gmail.com' },
    });
    if (user) {
      const response = await request(app)
        .put(`/users/${user.id}`)
        .send({
          password: 'tojetodda',
          newPassword: 'avsavavavava',
        })
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(401);
      expect(response.body.message).toMatch('Wrong password given');
    }
  });
  it('should not be able to update with wrong token', async () => {
    await request(app).post('/users').send({
      name: 'Ivo Ivic',
      email: 'ivoivic@gmail.com',
      password: 'jasamivo123',
    });
    const user = await userRepository.findOne({
      where: { email: 'ivoivic@gmail.com' },
    });
    if (user) {
      const response = await request(app)
        .put(`/users/${user.id}`)
        .send({
          name: 'Ljubo Ljubic',
        })
        .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(401);
      expect(response.body.message).toMatch('You cannot update other users');
    }
  });
});
