import { DeleteUserUseCase } from '../../../src/application/useCases/deleteUserUseCase';
import { FileUserRepository } from '../../../src/infrastructure/fileUserRepository';

describe('Delete user use case', () => {

  test('It should call the callback function with an error if missing required parameters: wallet_id', async () => {
    const wallet_id = '';

    const userRepository = new FileUserRepository();
    const spy = jest.spyOn(userRepository, 'delete').mockResolvedValue();
    const cb = jest.fn();

    const deleteUserUseCase = new DeleteUserUseCase(userRepository);
    await deleteUserUseCase.execute(wallet_id, cb);

    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(expect.any(Error));
    expect(spy).toHaveBeenCalledTimes(0);

    spy.mockRestore();
  });

  test('It should call the service delete action with the provided wallet_id', async () => {
    const wallet_id = '98917d00-9c5b-4642-abf5-5b7c99c7c2ed';

    const userRepository = new FileUserRepository();
    const spy = jest.spyOn(userRepository, 'delete').mockResolvedValue();
    const cb = jest.fn();

    const deleteUserUseCase = new DeleteUserUseCase(userRepository);
    await deleteUserUseCase.execute(wallet_id, cb);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(wallet_id);
    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(null);

    spy.mockRestore();
  });

  test('It should call the callback function with error if the service delete action throws an error', async () => {
    const wallet_id = '98917d00-9c5b-4642-abf5-5b7c99c7c2ed';

    const userRepository = new FileUserRepository();
    const spy = jest.spyOn(userRepository, 'delete').mockRejectedValue(new Error('Some error'));
    const cb = jest.fn();

    const deleteUserUseCase = new DeleteUserUseCase(userRepository);
    await deleteUserUseCase.execute(wallet_id, cb);

    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb).toHaveBeenCalledWith(expect.any(Error));

    spy.mockRestore();
  });

});
