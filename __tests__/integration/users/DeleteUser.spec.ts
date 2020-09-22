import { Connection, createConnection, getRepository, Repository } from 'typeorm';
import { User } from '../../../src/modules/users/infra/typeorm/entity';
import request from 'supertest';
import app from '../../../src/shared/infra/http/app';

let connection: Connection;
let userRepository: Repository<User>;

describe('Delete user', () => {
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
  it('should be able to delete a user', async () => {
    const { id } = await userRepository.save(
      userRepository.create({
        name: 'Marko Lukin',
        email: 'franelukin10@gmail.com',
        password: 'tojeto123',
      }),
    );
    const response = await request(app).delete(`/users/${id}`);
    const deletedUser = await userRepository.findOne({
      where: { email: 'franelukin10@gmail.com' },
    });

    expect(deletedUser).toBeFalsy();

    expect(response.status).toBe(204);
  });
  it('should not be able to delete a user with non-valid id', async () => {
    await userRepository.save(
      userRepository.create({
        name: 'Marko Lukin',
        email: 'franelukin10@gmail.com',
        password: 'tojeto123',
      }),
    );
    const response = await request(app).delete(`/users/aaaa`);
    const deletedUser = await userRepository.findOne({
      where: { email: 'franelukin10@gmail.com' },
    });

    expect(deletedUser).toBeTruthy();

    expect(response.status).toBe(400);
    expect(response.body.validation).toMatchObject({
      params: expect.objectContaining({
        message: expect.stringMatching(`"id" must be a number`),
      }),
    });
  });
});
