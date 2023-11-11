import { DataSource, Repository } from 'typeorm';
import { User } from '../../../src/modules/users/infra/typeorm/entity';
import request from 'supertest';
import app from '../../../src/shared/infra/http/server';
import { dataSource } from '../../../src/data-source';

let userRepository: Repository<User>;

describe('Create user', () => {
  let connection: DataSource;
  beforeAll(async () => {
    connection = await dataSource.initialize();
    userRepository = dataSource.getRepository(User);
  });
  afterEach(async () => {
    await dataSource.query('DELETE FROM users');
  });
  afterAll(async () => {
    await connection.destroy();
    app.close();
  });
  it('Should be able to create new user', async () => {
    const response = await request(app).post('/users').send({
      name: 'Marko Lukin',
      email: 'franelukin10@gmail.com',
      password: 'tojeto123',
    });
    const user = await userRepository.findOne({
      where: {
        email: 'franelukin10@gmail.com',
      },
    });
    expect(user).toBeTruthy();
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject(
      expect.objectContaining({
        id: expect.any(Number),
      }),
    );
  });
  it('should not be able to create two users with the same email', async () => {
    await request(app).post('/users').send({
      name: 'Marko Lukin',
      email: 'franelukin10@gmail.com',
      password: 'tojeto123',
    });
    const response = await request(app).post('/users').send({
      name: 'Marko Lukin',
      email: 'franelukin10@gmail.com',
      password: 'tojeto123',
    });
    const user = await userRepository.find({ where: { email: 'franelukin10@gmail.com' } });
    expect(user).toHaveLength(1);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject(
      expect.objectContaining({
        message: expect.stringMatching('Email already in use'),
      }),
    );
  });
  it('should not be able to create a new user with no name', async () => {
    const response = await request(app).post('/users').send({
      email: 'franelukin10@gmail.com',
      password: 'tojeto123',
    });
    const user = await userRepository.findOne({
      where: { email: 'franelukin10@gmail.com' },
    });
    expect(user).toBeFalsy();
    expect(response.status).toBe(400);
    expect(response.body.validation).toMatchObject({
      body: expect.objectContaining({
        message: expect.stringMatching('Name is required'),
      }),
    });
  });
  it('should not be able to create a new user with an invalid e-mail', async () => {
    const response = await request(app).post('/users').send({
      name: 'Marko Lukin',
      email: 'franelukingmail.com',
      password: 'tojeto123',
    });
    const user = await userRepository.findOne({
      where: { email: 'franelukin10@gmail.com' },
    });

    expect(user).toBeFalsy();
    expect(response.status).toBe(400);
    expect(response.body.validation).toMatchObject({
      body: expect.objectContaining({
        message: expect.stringMatching('This is not valid email'),
      }),
    });
  });
  it('should not be able to create a new user with a password of less than 6 digits', async () => {
    const response = await request(app).post('/users').send({
      name: 'Marko Lukin',
      email: 'franeluki10ngmail.com',
      password: '12345',
    });
    const user = await userRepository.findOne({
      where: { email: 'franelukin10@gmail.com' },
    });
    expect(user).toBeFalsy();
    expect(response.status).toBe(400);
    expect(response.body.validation).toMatchObject({
      body: expect.objectContaining({
        message: expect.stringMatching('Password cannot have less than 6 dígits'),
      }),
    });
  });
});
