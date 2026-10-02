import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';
import AppError from '../../../../../shared/errors/AppError';
import { ITokenProvider } from '../../../providers/ITokenProvider';

export default function ensureAuthenticated(request: Request, _response: Response, next: NextFunction): void {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError('Token missing', 401);
  }
  const token = authHeader.split(' ')[1];
  try {
    const id = container.resolve<ITokenProvider>('TokenProvider').verify(token);
    request.user = { id };
  } catch {
    throw new AppError('Token not valid.', 401);
  }
  next();
}
