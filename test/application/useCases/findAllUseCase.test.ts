import { FindAllUseCase } from '../../../src/application/useCases/findAllUseCase';
import { FileUserRepository } from '../../../src/infrastructure/fileUserRepository';

describe('Find all use case', () => {

  test('It should execute the service with no parameters', async () => {

    const userRepository = new FileUserRepository();
    const spy = jest.spyOn(userRepository, 'findAll').mockResolvedValue('' as never);

    const findAllUseCase = new FindAllUseCase(userRepository);
    const result = await findAllUseCase.execute();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({});

    spy.mockRestore();
  });

  test('It should execute the service with curated pagination filters: strings', async () => {

    const filters = {
      page: '1',
      limit: '4',
    };
    const filtersCurated = {
      page: 1,
      limit: 4,
    }

    const userRepository = new FileUserRepository();
    const spy = jest.spyOn(userRepository, 'findAll').mockResolvedValue('' as never);

    const findAllUseCase = new FindAllUseCase(userRepository);
    const result = await findAllUseCase.execute(filters);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(filtersCurated);

    spy.mockRestore();
  });

  test('It should throw an error if invalid filters are provided: page out of range', async () => {

    const filters = {
      page: '-1',
      limit: '4',
    };

    const userRepository = new FileUserRepository();
    const spy = jest.spyOn(userRepository, 'findAll').mockResolvedValue('' as never);

    const findAllUseCase = new FindAllUseCase(userRepository);

    await expect(findAllUseCase.execute(filters)).rejects.toThrow()
    expect(spy).toHaveBeenCalledTimes(0);

    spy.mockRestore();
  });

  test('It should throw an error if invalid filters are provided: limit out of range', async () => {

    const filters = {
      page: '1',
      limit: '-4',
    };

    const userRepository = new FileUserRepository();
    const spy = jest.spyOn(userRepository, 'findAll').mockResolvedValue('' as never);

    const findAllUseCase = new FindAllUseCase(userRepository);

    await expect(findAllUseCase.execute(filters)).rejects.toThrow()
    expect(spy).toHaveBeenCalledTimes(0);

    spy.mockRestore();
  });

  test('It should execute the service with sorting filters', async () => {

    const filters = {
      sortBy: 'name',
      sortDirection: 'ascending',
    };

    const userRepository = new FileUserRepository();
    const spy = jest.spyOn(userRepository, 'findAll').mockResolvedValue('' as never);

    const findAllUseCase = new FindAllUseCase(userRepository);
    const result = await findAllUseCase.execute(filters);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(filters);

    spy.mockRestore();
  });

  test('It should throw an error if invalid filters are provided: sortBy not sortable', async () => {

    const filters = {
      sortBy: 'football_team',
    };

    const userRepository = new FileUserRepository();
    const spy = jest.spyOn(userRepository, 'findAll').mockResolvedValue('' as never);

    const findAllUseCase = new FindAllUseCase(userRepository);

    await expect(findAllUseCase.execute(filters)).rejects.toThrow()
    expect(spy).toHaveBeenCalledTimes(0);

    spy.mockRestore();
  });

  test('It should throw an error if invalid filters are provided: invalid sortDirection', async () => {

    const filters = {
      sortBy: 'name',
      sortDirection: 'low-to-high',
    };

    const userRepository = new FileUserRepository();
    const spy = jest.spyOn(userRepository, 'findAll').mockResolvedValue('' as never);

    const findAllUseCase = new FindAllUseCase(userRepository);

    await expect(findAllUseCase.execute(filters)).rejects.toThrow()
    expect(spy).toHaveBeenCalledTimes(0);

    spy.mockRestore();
  });

  test('It should execute the service with a single matching filter', async () => {

    const filters = {
      'match[name]': 'cete',
    };
    const filtersCurated = {
      match: {
        name: 'cete',
      }
    }

    const userRepository = new FileUserRepository();
    const spy = jest.spyOn(userRepository, 'findAll').mockResolvedValue('' as never);

    const findAllUseCase = new FindAllUseCase(userRepository);
    const result = await findAllUseCase.execute(filters);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(filtersCurated);

    spy.mockRestore();
  });

  test('It should execute the service with multiple matching filters', async () => {

    const filters = {
      'match[name]': 'john',
      'match[last_name]': 'smith',
      'match[dni]': '123',
    };
    const filtersCurated = {
      match: {
        name: 'john',
        last_name: 'smith',
        dni: '123',
      }
    }

    const userRepository = new FileUserRepository();
    const spy = jest.spyOn(userRepository, 'findAll').mockResolvedValue('' as never);

    const findAllUseCase = new FindAllUseCase(userRepository);
    const result = await findAllUseCase.execute(filters);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(filtersCurated);

    spy.mockRestore();
  });

  test('It should throw an error if invalid filters are provided: invalid matching field', async () => {

    const filters = {
      'match[nonexistingfield]': 'john',
    };

    const userRepository = new FileUserRepository();
    const spy = jest.spyOn(userRepository, 'findAll').mockResolvedValue('' as never);

    const findAllUseCase = new FindAllUseCase(userRepository);

    await expect(findAllUseCase.execute(filters)).rejects.toThrow()
    expect(spy).toHaveBeenCalledTimes(0);

    spy.mockRestore();
  });


});
