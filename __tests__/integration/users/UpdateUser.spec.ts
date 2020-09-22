import { Connection, createConnection, getRepository, Repository } from 'typeorm';
import { User } from '../../../src/modules/users/infra/typeorm/entity';
import request from 'supertest';
import app from '../../../src/shared/infra/http/app';

let connection: Connection;
let userRepository: Repository<User>;

describe('Update user', () => {
  beforeAll(async () => {
    connection = await createConnection();
    userRepository = getRepository(User);
  });
  beforeEach(async () => {
    await userRepository.save(
      userRepository.create({
        name: 'Marko Lukin',
        email: 'franelukin10@gmail.com',
        password: 'tojeto123',
      }),
    );
  });
  afterEach(async () => {
    await connection.query('DELETE FROM users');
  });
  afterAll(async () => {
    await connection.close();
  });
  it('should be able to get a user by id', async () => {
    const user = await userRepository.findOne({
      where: { email: 'franelukin10@gmail.com' },
    });
    if (user) {
      const response = await request(app).put(`/users/${user.id}`).send({
        name: 'Frane Lukin',
      });
      expect(response.status).toBe(200);
      expect(response.body.name).toMatch('Frane Lukin');
      expect(response.body.email).toMatch('franelukin10@gmail.com');
    }
  });
});
