import { compare, hash } from 'bcrypt';

export class BcryptHashProvider {
  public generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }

  public compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }
}
