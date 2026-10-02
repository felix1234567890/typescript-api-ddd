import { ITokenProvider } from '../../src/modules/users/providers/ITokenProvider';

export class FakeTokenProvider implements ITokenProvider {
  public sign(userId: number): string {
    return `token-for-${userId}`;
  }

  public verify(token: string): number {
    return Number(token.replace('token-for-', ''));
  }
}
