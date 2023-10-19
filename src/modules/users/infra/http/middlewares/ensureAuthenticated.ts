import { Request, Response, NextFunction } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import AppError from '../../../../../shared/errors/AppError';
import config from '../../../../../config';

export default function ensureAuthenticated(request: Request, _response: Response, next: NextFunction): void {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError('Token missing', 401);
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = verify(token, config.secret);
    const { id } = decoded as JwtPayload;
    console.log(decoded);
    request.user = {
      id,
    };
    return next();
  } catch (error) {
    throw new AppError('Token not valid.', 401);
  }
}
