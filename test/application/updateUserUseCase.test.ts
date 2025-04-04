import { UpdateUserUseCase } from '../../src/application/updateUserUseCase';
import { FileUserRepository } from '../../src/infrastructure/fileUserRepository';

describe('Update user use case', () => {

  test('It should throw an error if missing wallet_id', async () => {
    const updateUser = {
      "name": "Juan",
      "last_name": "Perez",
    };

    const userRepository = new FileUserRepository();
    const spy = jest.spyOn(userRepository, 'update').mockResolvedValue({} as never);

    const updateUserUseCase = new UpdateUserUseCase(userRepository);
    await expect(updateUserUseCase.execute(updateUser)).rejects.toThrow();
    expect(spy).toHaveBeenCalledTimes(0);

    spy.mockRestore();
  });

  test('It sould only pass to the user repository the updatable fields', async () => {

    const updateUser = {
      "wallet_id": "ebfd85bb-757b-4021-a7af-5a723d905cf2",
      "name": "Juan",
      "last_name": "Perez",
      "created_at": "1990-06-12T10:41:19.886Z",
      "another_attr": "invalid attr",
    };

    const userRepository = new FileUserRepository();
    const spy = jest.spyOn(userRepository, 'update').mockResolvedValue({} as never);

    const updateUserUseCase = new UpdateUserUseCase(userRepository);
    updateUserUseCase.execute(updateUser);

    const [userToUpdate] = spy.mock.calls[0];

    expect(userToUpdate).toEqual(expect.objectContaining({
      "wallet_id": "ebfd85bb-757b-4021-a7af-5a723d905cf2",
      "name": "Juan",
      "last_name": "Perez",
    }));
    expect(userToUpdate).not.toHaveProperty('created_at');
    expect(userToUpdate).not.toHaveProperty('another_attr');

    spy.mockRestore();
  });

});
