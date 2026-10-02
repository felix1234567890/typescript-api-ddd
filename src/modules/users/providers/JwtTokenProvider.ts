import { JwtPayload, sign, verify } from 'jsonwebtoken';
import config from '../../../config';
import { ITokenProvider } from './ITokenProvider';

export class JwtTokenProvider implements ITokenProvider {
  public sign(userId: number): string {
    return sign({ id: userId }, config.secret, { expiresIn: '6h' });
  }

  public verify(token: string): number {
    const { id } = verify(token, config.secret) as JwtPayload;
    return Number(id);
  }
}
