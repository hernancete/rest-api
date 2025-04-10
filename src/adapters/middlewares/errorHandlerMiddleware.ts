import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError, InvalidInputError } from '../../domain/errors';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof UnauthorizedError) {
    res.status(err.status || 401);
    res.json({ message: err.message });
  } else if (err instanceof InvalidInputError) {
    res.status(err.status || 400);
    res.json({ message: err.message });
  } else {
    res.status(500);
    res.json({ message: 'Internal error' });
  }
}

export function notFoundErrorHandler(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  res.json({ message: 'Not found' });
};
