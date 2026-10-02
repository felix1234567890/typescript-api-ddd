import { IHashProvider } from '../../src/modules/users/providers/IHashProvider';

export class FakeHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return `hashed:${payload}`;
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return hashed === `hashed:${payload}`;
  }
}
