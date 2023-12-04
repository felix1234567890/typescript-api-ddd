import { DataSource, Repository } from 'typeorm';
import { User } from '../../../src/modules/users/infra/typeorm/entity';
import request from 'supertest';
import app from '../../../src/shared/infra/http/server';
import { dataSource } from '../../../src/data-source';

let userRepository: Repository<User>;

describe('Get user', () => {
  beforeAll(async () => {
    await (await dataSource.initialize()).synchronize(true)
    userRepository = dataSource.getRepository(User);
  });
  afterEach(async () => {
    await dataSource.query('DELETE FROM users');
  });
  afterAll(async () => {
    await dataSource.destroy()
    app.close()
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
