import { FakeHashProvider } from '../../fakes/FakeHashProvider';
import { FakeUserRepository } from '../../fakes/FakeUserRepository';
import { CreateUserService } from '../../../src/modules/users/services/CreateUserService';

let fakeUserRepository: FakeUserRepository;
let createUser: CreateUserService;

describe('Create User Service', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    createUser = new CreateUserService(fakeUserRepository, new FakeHashProvider());
  });

  it('should create a user and store only the hashed password', async () => {
    const user = await createUser.execute({ name: 'Ana', email: 'ana@example.com', password: 'secret1' });

    expect(user.password).toBe('hashed:secret1');
    await expect(fakeUserRepository.findByEmail('ana@example.com')).resolves.toMatchObject({ id: user.id });
  });

  it('should not create two users with the same email', async () => {
    await createUser.execute({ name: 'Ana', email: 'ana@example.com', password: 'secret1' });

    await expect(
      createUser.execute({ name: 'Other', email: 'ana@example.com', password: 'secret2' }),
    ).rejects.toMatchObject({ message: 'Email already in use' });
  });
});
