import { CreateUserUseCase } from '../../src/application/createUserUseCase';
import { FileUserRepository } from '../../src/infrastructure/fileUserRepository';

describe('Create user use case', () => {

  const uuidRegex = new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
  const isoDateRegex = new RegExp(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/);

  test('It should set a new wallet_id for the user', async () => {
    const newUser = {
      "email": "newuser@gmail.com",
      "name": "Juan",
      "last_name": "Perez",
      "sex_type": "male",
      "dni": "81234567",
      "birth_date": "1990-06-12T10:41:19.886Z",
    };

    const userRepository = new FileUserRepository();
    const spy = jest.spyOn(userRepository, 'create').mockResolvedValue({} as never);

    const createUserUseCase = new CreateUserUseCase(userRepository);
    await createUserUseCase.execute(newUser);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(expect.objectContaining({
      wallet_id: expect.stringMatching(uuidRegex),
    }));

    spy.mockRestore();
  });

  test('It should set a the created_at for the user', async () => {
    const newUser = {
      "email": "newuser@gmail.com",
      "name": "Juan",
      "last_name": "Perez",
      "sex_type": "male",
      "dni": "81234567",
      "birth_date": "1990-06-12T10:41:19.886Z",
    };

    const userRepository = new FileUserRepository();
    const spy = jest.spyOn(userRepository, 'create').mockResolvedValue({} as never);

    const createUserUseCase = new CreateUserUseCase(userRepository);
    await createUserUseCase.execute(newUser);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(expect.objectContaining({
      created_at: expect.stringMatching(isoDateRegex),
    }));

    spy.mockRestore();
  });

  test('It should call the service create action with the provided data plus the generated one', async () => {
    const newUser = {
      "email": "newuser@gmail.com",
      "name": "Juan",
      "last_name": "Perez",
      "sex_type": "male",
      "dni": "81234567",
      "birth_date": "1990-06-12T10:41:19.886Z",
    };

    const userRepository = new FileUserRepository();
    const spy = jest.spyOn(userRepository, 'create').mockResolvedValue({} as never);

    const createUserUseCase = new CreateUserUseCase(userRepository);
    await createUserUseCase.execute(newUser);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(expect.objectContaining({
      ...newUser,
      created_at: expect.stringMatching(isoDateRegex),
      wallet_id: expect.stringMatching(uuidRegex),
    }));

    spy.mockRestore();
  });

  test('It should throw an error if missing required parameters: email', async () => {
    const newUser = {
      "name": "Juan",
      "last_name": "Perez",
      "sex_type": "male",
      "dni": "81234567",
      "birth_date": "1990-06-12T10:41:19.886Z",
    };

    const userRepository = new FileUserRepository();
    const spy = jest.spyOn(userRepository, 'create').mockResolvedValue({} as never);

    const createUserUseCase = new CreateUserUseCase(userRepository);
    await expect(createUserUseCase.execute(newUser)).rejects.toThrow();
    expect(spy).toHaveBeenCalledTimes(0);

    spy.mockRestore();
  });

  test('It should throw an error if missing required parameters: name', async () => {
    const newUser = {
      "email": "newuser@gmail.com",
      "last_name": "Perez",
      "sex_type": "male",
      "dni": "81234567",
      "birth_date": "1990-06-12T10:41:19.886Z",
    };

    const userRepository = new FileUserRepository();
    const spy = jest.spyOn(userRepository, 'create').mockResolvedValue({} as never);

    const createUserUseCase = new CreateUserUseCase(userRepository);
    await expect(createUserUseCase.execute(newUser)).rejects.toThrow();
    expect(spy).toHaveBeenCalledTimes(0);

    spy.mockRestore();
  });

  test('It should throw an error if missing required parameters: last_name', async () => {
    const newUser = {
      "email": "newuser@gmail.com",
      "name": "Juan",
      "sex_type": "male",
      "dni": "81234567",
      "birth_date": "1990-06-12T10:41:19.886Z",
    };

    const userRepository = new FileUserRepository();
    const spy = jest.spyOn(userRepository, 'create').mockResolvedValue({} as never);

    const createUserUseCase = new CreateUserUseCase(userRepository);
    await expect(createUserUseCase.execute(newUser)).rejects.toThrow();
    expect(spy).toHaveBeenCalledTimes(0);

    spy.mockRestore();
  });

  test('It should throw an error if missing required parameters: dni', async () => {
    const newUser = {
      "email": "newuser@gmail.com",
      "name": "Juan",
      "last_name": "Perez",
      "sex_type": "male",
      "birth_date": "1990-06-12T10:41:19.886Z",
    };

    const userRepository = new FileUserRepository();
    const spy = jest.spyOn(userRepository, 'create').mockResolvedValue({} as never);

    const createUserUseCase = new CreateUserUseCase(userRepository);
    await expect(createUserUseCase.execute(newUser)).rejects.toThrow();
    expect(spy).toHaveBeenCalledTimes(0);

    spy.mockRestore();
  });

});
