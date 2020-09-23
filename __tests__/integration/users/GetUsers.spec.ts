import { Connection, Repository, createConnection, getRepository } from 'typeorm';
import { User } from '../../../src/modules/users/infra/typeorm/entity';
import request from 'supertest';
import app from '../../../src/shared/infra/http/app';

let connection: Connection;
let userRepository: Repository<User>;

describe('Get users', () => {
  beforeAll(async () => {
    connection = await createConnection();
    userRepository = getRepository(User);
  });
  afterEach(async () => {
    await connection.query('DELETE FROM users');
  });
  afterAll(async () => {
    await connection.close();
  });
  it('should be able to get  users', async () => {
    await userRepository.save(
      userRepository.create({
        name: 'Frane Lukin',
        email: 'franelukin10@gmail.com',
        password: 'frane123456',
      }),
    );
    await userRepository.save(
      userRepository.create({
        name: 'Marko Juric',
        email: 'markojuric10@gmail.com',
        password: 'marko12345',
      }),
    );
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    expect(response.body[0].books).toBeDefined();
  });
  it('should have no users on first request ', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(0);
  });
  it('should be able to paginate users', async () => {
    await userRepository.save(
      userRepository.create({
        name: 'Frane Lukin',
        email: 'franelukin10@gmail.com',
        password: 'frane123456',
      }),
    );
    await userRepository.save(
      userRepository.create({
        name: 'Marko Juric',
        email: 'markojuric10@gmail.com',
        password: 'marko12345',
      }),
    );
    const response = await request(app).get('/users/?skip=1&limit=1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].name).toMatch('Marko Juric');
  });
});
