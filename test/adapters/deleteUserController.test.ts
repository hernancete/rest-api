import { deleteUserController } from '../../src/adapters/controllers/deleteUserController';
import { DeleteUserUseCase }  from '../../src/application/deleteUserUseCase';

describe('Delete user controller', () => {

  const wallet_id = '6943f1c7-4310-4771-b9e6-f83af585dbb5';

  test('It should execute the use case with provided wallet_id', async () => {

    const spy = jest.spyOn(DeleteUserUseCase.prototype, 'execute').mockResolvedValue();

    const req = { params: { wallet_id } } as any;
    const res = { json: jest.fn() } as any;
    const next = jest.fn();

    await deleteUserController(req, res, next);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(wallet_id);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      message: expect.stringMatching(/user deleted/i),
    }));

    spy.mockRestore();
  });

  test('It should call the error handler if no params is provided', async () => {

    const spy = jest.spyOn(DeleteUserUseCase.prototype, 'execute').mockResolvedValue();

    const req = { } as any;
    const res = { json: jest.fn() } as any;
    const next = jest.fn();

    await deleteUserController(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(expect.any(Error));
    expect(spy).toHaveBeenCalledTimes(0);

    spy.mockRestore();
  });

  test('It should call the error handler if the use case throws an error', async () => {

    const spy = jest.spyOn(DeleteUserUseCase.prototype, 'execute').mockRejectedValue(new Error('Some error'));

    const req = { params: { wallet_id } } as any;
    const res = { json: jest.fn() } as any;
    const next = jest.fn();

    await deleteUserController(req, res, next);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(expect.any(Error));

    spy.mockRestore();
  });

});
