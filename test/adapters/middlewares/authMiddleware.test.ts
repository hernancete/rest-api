import { Request, Response } from 'express';
import { authHandler } from '../../../src/adapters/middlewares/authMiddleware';

describe('Auth middleware', () => {

  const validAuthToken = 'validToken';

  test('It should allow the execution of controller for authenticated users', () => {
    const req = {
      headers: {
        authorization: validAuthToken,
      },
    } as any;
    const next = jest.fn();

    authHandler(req, {} as Response, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith();
  });

  test('It should stop the execution of controller for unauthenticated users: invalid token', () => {
    const req = {
      headers: {
        authorization: 'invalid-token',
      },
    } as any;
    const next = jest.fn();

    authHandler(req, {} as Response, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });

  test('It should stop the execution of controller for unauthenticated users: no authorization header', () => {
    const req = { } as any;
    const next = jest.fn();

    authHandler(req, {} as Response, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });

});
