import { Request, Response } from 'express';
import { authHandler } from '../../../src/adapters/middlewares/authMiddleware';

describe('Auth middleware', () => {

  const AUTH_USER = 'user';
  const AUTH_PASS = 'password';

  test('It should allow the execution of controller for authenticated users', () => {
    const basicAuthHash = Buffer.from(`${AUTH_USER}:${AUTH_PASS}`).toString('base64');
    const req = {
      headers: {
        authorization: `Basic ${basicAuthHash}`,
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
