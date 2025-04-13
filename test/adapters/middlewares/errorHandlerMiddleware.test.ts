import { Request, Response } from 'express';
import { errorHandler, notFoundErrorHandler } from '../../../src/adapters/middlewares/errorHandlerMiddleware';
import { InvalidInputError, UnauthorizedError, NotFoundError } from '../../../src/domain/errors';

describe('Error handler middleware', () => {

  test('It should call the response with a 400 status when error is InvalidInputError', () => {
    const err = new InvalidInputError();
    const res = {
      status: jest.fn(),
      json: jest.fn(),
    } as any;

    errorHandler(err, {} as Request, res, {} as any);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  test('It should call the response with a 401 status when error is UnauthorizedError', () => {
    const err = new UnauthorizedError();
    const res = {
      status: jest.fn(),
      json: jest.fn(),
    } as any;

    errorHandler(err, {} as Request, res, {} as any);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  test('It should call the response with a 401 status when error is NotFoundError', () => {
    const err = new NotFoundError();
    const res = {
      status: jest.fn(),
      json: jest.fn(),
    } as any;

    errorHandler(err, {} as Request, res, {} as any);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  test('It should call the response with a 500 status for all errors but InvalidInputError, UnauthorizedError', () => {
    const err = new Error();
    const res = {
      status: jest.fn(),
      json: jest.fn(),
    } as any;

    errorHandler(err, {} as Request, res, {} as any);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
  });

});

describe('Not Found error handler middleware', () => {

  test('It should call the response with a 404 status', () => {
    const res = {
      status: jest.fn(),
      json: jest.fn(),
    } as any;

    notFoundErrorHandler({} as Request, res, {} as any);

    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(404);
  });

});
