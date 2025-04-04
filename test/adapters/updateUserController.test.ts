import { updateUserController } from '../../src/adapters/controllers/updateUserController';
import { UpdateUserUseCase }  from '../../src/application/updateUserUseCase';

describe('Update user controller', () => {

  const wallet_id = "7b989385-555b-4d99-89b2-8f23eb1020e7";
  const inputBody = {
    "email": "juancito@gmail.com",
    "name": "Juancito",
    "last_name": "Perez Garcia",
  };
  const updatedUser = {
    wallet_id,
    ...inputBody,
    "sex_type": "male",
    "dni": "13283407",
    "birth_date": "1987-06-02T13:30:49.942Z",
    "created_at": "2022-10-16T16:22:07.441Z"
  };

  test('It should execute the use case with provided wallet_id and body', async () => {
    const spy = jest.spyOn(UpdateUserUseCase.prototype, 'execute').mockResolvedValue(updatedUser as never);

    const req = { params: { wallet_id }, body: inputBody } as any;
    const res = { json: jest.fn() } as any;
    const next = jest.fn();

    const response = await updateUserController(req, res, next);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(wallet_id, inputBody);
    expect(res.json).toHaveBeenCalledWith(updatedUser);

    spy.mockRestore();
  });

  test('It should call the error handler if no wallet_id is provided', async () => {
    const spy = jest.spyOn(UpdateUserUseCase.prototype, 'execute').mockResolvedValue({} as never);

    const req = { params: {}, body: inputBody } as any;
    const res = { json: jest.fn() } as any;
    const next = jest.fn();

    const response = await updateUserController(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(expect.any(Error));
    expect(spy).toHaveBeenCalledTimes(0);

    spy.mockRestore();
  });

  test('It should call the error handler if no body is provided', async () => {
    const spy = jest.spyOn(UpdateUserUseCase.prototype, 'execute').mockResolvedValue({} as never);

    const req = { params: { wallet_id } } as any;
    const res = { json: jest.fn() } as any;
    const next = jest.fn();

    const response = await updateUserController(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(expect.any(Error));
    expect(spy).toHaveBeenCalledTimes(0);

    spy.mockRestore();
  });

  test('It should call the error handler if the use case throws an error', async () => {
    const spy = jest.spyOn(UpdateUserUseCase.prototype, 'execute').mockRejectedValue(new Error('Some error'));

    const req = { params: { wallet_id }, body: inputBody } as any;
    const res = { json: jest.fn() } as any;
    const next = jest.fn();

    const response = await updateUserController(req, res, next);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(expect.any(Error));

    spy.mockRestore();
  });

});
