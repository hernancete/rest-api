import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../../domain/errors';

const validAuthToken = 'validToken';

export function authHandler(req: Request, res: Response, next: NextFunction) {
  if (!validateToken(req.headers?.authorization as string)) {
    return next(new UnauthorizedError());
  }
  return next();
}

function validateToken(token: string | undefined) {
  return token === validAuthToken;
}
