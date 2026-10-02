import { compare, hash } from 'bcrypt';
import { IHashProvider } from './IHashProvider';

export class BcryptHashProvider implements IHashProvider {
  public generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  public compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}
