import { deleteUserController } from '../../../src/adapters/controllers/deleteUserController';
import { DeleteUserUseCase }  from '../../../src/application/useCases/deleteUserUseCase';

import { FileUserRepository } from "../../../src/infrastructure/fileUserRepository";

describe('Delete user controller', () => {

  const wallet_id = '6943f1c7-4310-4771-b9e6-f83af585dbb5';

  test('It should execute the use case with provided wallet_id', async () => {

    const spy = jest.spyOn(DeleteUserUseCase.prototype, 'execute');

    const req = { params: { wallet_id } } as any;
    const res = { json: jest.fn() } as any;
    const next = jest.fn();

    // Aunque el controller no está declarado como promise, está llamando al service que es asíncrono
    // Seguramente Express puede manejar el controlador síncrono o asíncrono
    // Acá hay que esperar que termine (await) sino el test falla. A diferencia de Express, acá hay que explicitar el await
    await deleteUserController(req, res, next);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(wallet_id, expect.any(Function));

    spy.mockRestore();
  });

  test('It should call the error handler if no params is provided', async () => {

    const spy = jest.spyOn(DeleteUserUseCase.prototype, 'execute');

    const req = { } as any;
    const res = { json: jest.fn() } as any;
    const next = jest.fn();

    await deleteUserController(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(expect.any(Error));
    expect(spy).toHaveBeenCalledTimes(0);

    spy.mockRestore();
  });

  test('It should call the error handler if the callback is called with error', async () => {

    const spy = jest.spyOn(FileUserRepository.prototype, 'delete').mockRejectedValue(new Error('Some error'));

    const req = { params: { wallet_id } } as any;
    const res = { json: jest.fn() } as any;
    const next = jest.fn();

    await deleteUserController(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenCalledWith(expect.any(Error));

    spy.mockRestore();
  });

});
