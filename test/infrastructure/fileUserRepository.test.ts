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

  test('It should call the save action with the provided data', async () => {
    // email, name, last_name, dni
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

  test('It should call the save action with the provided partial data', async () => {
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

});
