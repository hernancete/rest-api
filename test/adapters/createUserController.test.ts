import { createUserController } from '../../src/adapters/createUserController';
import { CreateUserUseCase }  from '../../src/application/createUserUseCase';

describe('Create user controller', () => {

  const inputBody = {
    "email": "newuser@gmail.com",
    "name": "Juan",
    "last_name": "Perez",
    "sex_type": "male",
    "dni": "81234567",
    "birth_date": "1990-06-12T10:41:19.886Z",
  };
  const createdUser = {
    ...inputBody,
    wallet_id: '6943f1c7-4310-4771-b9e6-f83af585dbb5',
    created_at: '2025-04-03T02:01:55.095Z',
  };

  test('It should execute the use case with provided body', async () => {

    const spy = jest.spyOn(CreateUserUseCase.prototype, 'execute').mockResolvedValue(createdUser as never);

    const req = { body: inputBody } as any;
    const res = { json: jest.fn() } as any;
    const next = jest.fn();

    const response = await createUserController(req, res, next);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(req.body);
    expect(res.json).toHaveBeenCalledWith(createdUser);

    spy.mockRestore();
  });

  test('It should call the error handler if no body is provided', async () => {

    const spy = jest.spyOn(CreateUserUseCase.prototype, 'execute').mockResolvedValue(createdUser as never);

    const req = { } as any;
    const res = { json: jest.fn() } as any;
    const next = jest.fn();

    const response = await createUserController(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(expect.any(Error));
    expect(spy).toHaveBeenCalledTimes(0);

    spy.mockRestore();
  });

  test('It should call the error handler if the use case throws an error', async () => {

    const spy = jest.spyOn(CreateUserUseCase.prototype, 'execute').mockRejectedValue(new Error('Some error'));

    const req = { body: inputBody } as any;
    const res = { json: jest.fn() } as any;
    const next = jest.fn();

    const response = await createUserController(req, res, next);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(expect.any(Error));

    spy.mockRestore();
  });

});
