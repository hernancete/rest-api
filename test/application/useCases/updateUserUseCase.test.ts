import { UpdateUserUseCase } from '../../../src/application/useCases/updateUserUseCase';
import { FileUserRepository } from '../../../src/infrastructure/fileUserRepository';
import { User } from '../../../src/domain/user';

describe('Update user use case', () => {

  test('It should throw an error if missing wallet_id', async () => {
    const wallet_id = '';
    const updateUser = {
      "name": "Juan",
      "last_name": "Perez",
    } as User;

    const userRepository = new FileUserRepository();
    const spy = jest.spyOn(userRepository, 'update').mockResolvedValue({} as never);

    const updateUserUseCase = new UpdateUserUseCase(userRepository);
    await expect(updateUserUseCase.execute(wallet_id, updateUser)).rejects.toThrow();
    expect(spy).toHaveBeenCalledTimes(0);

    spy.mockRestore();
  });

  test('It sould only pass to the user repository the updatable fields', async () => {
    const wallet_id = "ebfd85bb-757b-4021-a7af-5a723d905cf2";
    const updateUser = {
      "name": "Juan",
      "last_name": "Perez",
      "created_at": "1990-06-12T10:41:19.886Z",
      "another_attr": "invalid attr",
    };

    const userRepository = new FileUserRepository();
    const spy = jest.spyOn(userRepository, 'update').mockResolvedValue({} as never);

    const updateUserUseCase = new UpdateUserUseCase(userRepository);
    updateUserUseCase.execute(wallet_id, updateUser);

    const [userIdToUpdate, userToUpdate] = spy.mock.calls[0];

    expect(userIdToUpdate).toBe('ebfd85bb-757b-4021-a7af-5a723d905cf2');
    expect(userToUpdate).toEqual(expect.objectContaining({
      "name": "Juan",
      "last_name": "Perez",
    }));
    expect(userToUpdate).not.toHaveProperty('created_at');
    expect(userToUpdate).not.toHaveProperty('another_attr');

    spy.mockRestore();
  });

});
