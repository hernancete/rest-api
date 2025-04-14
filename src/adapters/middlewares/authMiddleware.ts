import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../../domain/errors';

export function authHandler(req: Request, res: Response, next: NextFunction) {
  if (!validateToken(req.headers?.authorization as string)) {
    return next(new UnauthorizedError());
  }
  return next();
}

function validateToken(token: string | undefined) {

  if (!token || !token.startsWith("Basic ")) return false;

  try {
    const base64Creds = token.split(' ')[1];
    const credentials = Buffer.from(base64Creds, 'base64').toString('utf-8');
    const [user, password] = credentials.split(":");
    return (user === process.env.AUTH_USER && password === process.env.AUTH_PASS);
  } catch (e) {
    return false;
  }
}
