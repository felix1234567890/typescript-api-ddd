import { FakeHashProvider } from '../../fakes/FakeHashProvider';
import { FakeUserRepository } from '../../fakes/FakeUserRepository';
import { UpdateUserService } from '../../../src/modules/users/services/UpdateUserService';

let fakeUserRepository: FakeUserRepository;
let updateUser: UpdateUserService;

describe('Update User Service', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    updateUser = new UpdateUserService(fakeUserRepository, new FakeHashProvider());
  });

  it('should update the name without touching the email', async () => {
    const user = await fakeUserRepository.create({ name: 'Ana', email: 'ana@example.com', password: 'hashed:secret1' });

    const updated = await updateUser.execute({ id: user.id, userId: user.id, name: 'Ana Maria' });

    expect(updated).toMatchObject({ name: 'Ana Maria', email: 'ana@example.com' });
  });

  it('should allow resubmitting the current email', async () => {
    const user = await fakeUserRepository.create({ name: 'Ana', email: 'ana@example.com', password: 'hashed:secret1' });

    await expect(updateUser.execute({ id: user.id, userId: user.id, email: 'ana@example.com' })).resolves.toMatchObject(
      { email: 'ana@example.com' },
    );
  });

  it('should not take another user’s email', async () => {
    const user = await fakeUserRepository.create({ name: 'Ana', email: 'ana@example.com', password: 'hashed:secret1' });
    await fakeUserRepository.create({ name: 'Bo', email: 'bo@example.com', password: 'hashed:secret2' });

    await expect(updateUser.execute({ id: user.id, userId: user.id, email: 'bo@example.com' })).rejects.toMatchObject({
      message: 'Email is already in use',
    });
  });

  it('should not update someone else', async () => {
    const user = await fakeUserRepository.create({ name: 'Ana', email: 'ana@example.com', password: 'hashed:secret1' });

    await expect(updateUser.execute({ id: user.id, userId: user.id + 1, name: 'Hax' })).rejects.toMatchObject({
      statusCode: 401,
    });
  });

  it('should change the password only when the old one matches', async () => {
    const user = await fakeUserRepository.create({ name: 'Ana', email: 'ana@example.com', password: 'hashed:secret1' });

    await expect(
      updateUser.execute({ id: user.id, userId: user.id, password: 'wrong', newPassword: 'secret2' }),
    ).rejects.toMatchObject({ statusCode: 401, message: 'Wrong password given' });

    const updated = await updateUser.execute({
      id: user.id,
      userId: user.id,
      password: 'secret1',
      newPassword: 'secret2',
    });
    expect(updated.password).toBe('hashed:secret2');
  });
});
