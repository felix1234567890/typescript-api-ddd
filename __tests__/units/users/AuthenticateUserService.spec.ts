import { FakeHashProvider } from '../../fakes/FakeHashProvider';
import { FakeTokenProvider } from '../../fakes/FakeTokenProvider';
import { FakeUserRepository } from '../../fakes/FakeUserRepository';
import { AuthenticateUserService } from '../../../src/modules/users/services/AuthenticateUserService';

let fakeUserRepository: FakeUserRepository;
let authenticateUser: AuthenticateUserService;

describe('Authenticate User Service', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    authenticateUser = new AuthenticateUserService(fakeUserRepository, new FakeHashProvider(), new FakeTokenProvider());
  });

  it('should return the user and a token for valid credentials', async () => {
    const user = await fakeUserRepository.create({ name: 'Ana', email: 'ana@example.com', password: 'hashed:secret1' });

    const result = await authenticateUser.execute({ email: 'ana@example.com', password: 'secret1' });

    expect(result).toEqual({ user, token: `token-for-${user.id}` });
  });

  it('should reject an unknown email', async () => {
    await expect(authenticateUser.execute({ email: 'x@example.com', password: 'secret1' })).rejects.toMatchObject({
      statusCode: 401,
    });
  });

  it('should reject a wrong password', async () => {
    await fakeUserRepository.create({ name: 'Ana', email: 'ana@example.com', password: 'hashed:secret1' });

    await expect(authenticateUser.execute({ email: 'ana@example.com', password: 'nope' })).rejects.toMatchObject({
      statusCode: 401,
      message: 'Wrong password provided',
    });
  });
});
