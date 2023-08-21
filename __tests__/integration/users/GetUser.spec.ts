import { DataSource, Repository } from 'typeorm';
import { User } from '../../../src/modules/users/infra/typeorm/entity';
import request from 'supertest';
import app from '../../../src/shared/infra/http/app';
import { dataSource } from '../../../src/data-source';

let connection: DataSource;;
let userRepository: Repository<User>;

describe('Get user', () => {
  beforeAll(async () => {
    connection = await dataSource.initialize();
    userRepository =dataSource.getRepository(User);
  });
  afterEach(async () => {
    await connection.query('DELETE FROM users');
  });
  afterAll(async () => {
    await connection.destroy();
  });
  it('should be able to get a user by id', async () => {
    const { id } = await userRepository.save(
      userRepository.create({
        name: 'Marko Lukin',
        email: 'franelukin10@gmail.com',
        password: 'tojeto123',
      }),
    );
    const response = await request(app).get(`/users/${id}`);
    expect(response.status).toBe(200);
  });
});
