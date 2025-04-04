import fs from 'fs/promises';
import { v4 } from 'uuid';
import { FileUserRepository } from '../../src/infrastructure/fileUserRepository';
import { User } from '../../src/domain/user';
import { users } from '../data';

describe('File user repository - find all users', () => {

  test('It should return all the users in available', async () => {
    const spy = jest.spyOn(fs, 'readFile').mockResolvedValue(Buffer.from(JSON.stringify(users)));

    const fileUserRepository = new FileUserRepository();
    const allUsers = await fileUserRepository.findAll();

    expect(allUsers).toHaveLength(users.length);
    expect(allUsers[0]).toEqual(expect.objectContaining(users[0]));

    spy.mockRestore();
  });

  test('It should return empty array if no users available', async () => {
    const spy = jest.spyOn(fs, 'readFile').mockResolvedValue(Buffer.from(JSON.stringify([])));

    const fileUserRepository = new FileUserRepository();
    const allUsers = await fileUserRepository.findAll();

    expect(allUsers).toBeInstanceOf(Array);
    expect(allUsers).toHaveLength(0);

    spy.mockRestore();
  });

});

describe('File user repository - create new user', () => {

  test('It should save the user in the persistent layer', async () => {
    const newUser = {
      "wallet_id": v4(),
      "email": "newuser@gmail.com",
      "name": "Juan",
      "last_name": "Perez",
      "sex_type": "male",
      "dni": "81234567",
      "birth_date": "1990-06-12T10:41:19.886Z",
      "created_at": "2025-04-02T23:32:00.886Z",
    };

    const spyRead = jest.spyOn(fs, 'readFile').mockResolvedValue(Buffer.from(JSON.stringify(users)));
    const spyWrite = jest.spyOn(fs, 'writeFile').mockResolvedValue();
    const fileUserRepository = new FileUserRepository();
    await fileUserRepository.create(newUser);

    expect(spyWrite).toHaveBeenCalledTimes(1);
    expect(spyWrite).toHaveBeenCalledWith(expect.anything(), JSON.stringify([ ...users, newUser ]));

    spyRead.mockRestore();
    spyWrite.mockRestore();
  });

  test('It should save the user in the persistent layer even with some non-required attributes missing', async () => {
    const newUser = {
      "wallet_id": v4(),
      "email": "newuser@gmail.com",
      "name": "Juan",
      "last_name": "Perez",
      "dni": "81234567",
      "created_at": "2025-04-02T23:32:00.886Z",
    };

    const spyRead = jest.spyOn(fs, 'readFile').mockResolvedValue(Buffer.from(JSON.stringify(users)));
    const spyWrite = jest.spyOn(fs, 'writeFile').mockResolvedValue();

    const fileUserRepository = new FileUserRepository();
    await fileUserRepository.create(newUser);

    expect(spyWrite).toHaveBeenCalledTimes(1);
    expect(spyWrite).toHaveBeenCalledWith(expect.anything(), JSON.stringify([ ...users, newUser ]));

    spyRead.mockRestore();
    spyWrite.mockRestore();
  });

  test('It should throw an error if wallet_id is missing', async () => {
    // simulate a db's primary key
    const newUser = {
      "email": "newuser@gmail.com",
      "name": "Juan",
      "last_name": "Perez",
      "sex_type": "male",
      "dni": "81234567",
      "birth_date": "1990-06-12T10:41:19.886Z",
      "created_at": "2025-04-02T23:32:00.886Z",
    };

    const spyRead = jest.spyOn(fs, 'readFile').mockResolvedValue(Buffer.from(JSON.stringify(users)));
    const spyWrite = jest.spyOn(fs, 'writeFile').mockResolvedValue();

    const fileUserRepository = new FileUserRepository();

    await expect(() => fileUserRepository.create(newUser as User)).rejects.toThrow();

    expect(spyRead).toHaveBeenCalledTimes(0);
    expect(spyWrite).toHaveBeenCalledTimes(0);

    spyRead.mockRestore();
    spyWrite.mockRestore();
  });

});

describe('File user repository - delete user', () => {

  test('It should call the delete the user with the given user id', async () => {
    const wallet_id = '98917d00-9c5b-4642-abf5-5b7c99c7c2ed';

    const spyRead = jest.spyOn(fs, 'readFile').mockResolvedValue(Buffer.from(JSON.stringify(users)));
    const spyWrite = jest.spyOn(fs, 'writeFile').mockResolvedValue();

    const fileUserRepository = new FileUserRepository();
    await fileUserRepository.delete(wallet_id);

    const [ , updatedUserList ] = spyWrite.mock.calls[0];
    const deletedUserInUpdatedUsersList = JSON.parse(updatedUserList as string).find((u: User) => u.wallet_id === wallet_id);

    expect(spyRead).toHaveBeenCalledTimes(1);
    expect(spyWrite).toHaveBeenCalledTimes(1);
    expect(deletedUserInUpdatedUsersList).toBeUndefined();

    spyRead.mockRestore();
    spyWrite.mockRestore();
  });

});

describe('File user repository - update user', () => {

  test('It should throw an error if the user does not exist', async () => {
    const updateUser = {
      "wallet_id": "ebfd85bb-757b-4021-a7af-5a723d905cf2",
      "name": "Juancito",
    };

    const spyRead = jest.spyOn(fs, 'readFile').mockResolvedValue(Buffer.from(JSON.stringify(users)));
    const spyWrite = jest.spyOn(fs, 'writeFile').mockResolvedValue();

    const fileUserRepository = new FileUserRepository();
    await expect(() => fileUserRepository.update(updateUser)).rejects.toThrow();
    expect(spyRead).toHaveBeenCalledTimes(1);
    expect(spyWrite).toHaveBeenCalledTimes(0);

    spyRead.mockRestore();
    spyWrite.mockRestore();
  });

  test('It should save the user with the updated data', async () => {

    const updateUser = {
      "wallet_id": "98917d00-9c5b-4642-abf5-5b7c99c7c2ed",
      "name": "Maria Jose",
    };

    const spyRead = jest.spyOn(fs, 'readFile').mockResolvedValue(Buffer.from(JSON.stringify(users)));
    const spyWrite = jest.spyOn(fs, 'writeFile').mockResolvedValue();

    const fileUserRepository = new FileUserRepository();
    const updated = await fileUserRepository.update(updateUser);

    const [,updatedUsersList] = spyWrite.mock.calls[0];
    const updatedUser = JSON.parse(updatedUsersList as string).find((u: User) => u.wallet_id === updateUser.wallet_id);

    expect(spyWrite).toHaveBeenCalledTimes(1);
    expect(updatedUser).toEqual(expect.objectContaining(updateUser));

    spyRead.mockRestore();
    spyWrite.mockRestore();
  });

});
