import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import AppError from '../../../../../shared/errors/AppError';
import config from '../../../../../config';

interface TokenPayload {
  iat: string;
  exp: string;
  sub: string;
}

export default function ensureAuthenticated(request: Request, _response: Response, next: NextFunction): void {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError('Token missing', 401);
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = verify(token, config.secret);
    const { sub } = decoded as TokenPayload;
    request.user = {
      id: sub,
    };
    return next();
  } catch (error) {
    console.log(error);
    throw new AppError('Token not valid.', 401);
  }
}
