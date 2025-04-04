import { FindAllUseCase } from '../../../src/application/useCases/findAllUseCase';
import { FileUserRepository } from '../../../src/infrastructure/fileUserRepository';

describe('Find all use case', () => {

  test('It should execute the service with no parameters', async () => {

    const userRepository = new FileUserRepository();
    const spy = jest.spyOn(userRepository, 'findAll').mockResolvedValue('' as never);

    const findAllUseCase = new FindAllUseCase(userRepository);
    const result = await findAllUseCase.execute();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith();

    spy.mockRestore();
  });

});
