import { FileUserRepository } from '../../src/infrastructure/fileUserRepository';
import fs from 'fs/promises';
import { users } from '../data';

describe('File user repository - findAll', () => {

  test('It should return all the users in available', async () => {
    const spy = jest.spyOn(fs, 'readFile').mockResolvedValue(JSON.stringify(users) as never);

    const fileUserRepository = new FileUserRepository();
    const allUsers = await fileUserRepository.findAll();

    expect(allUsers).toHaveLength(users.length);
    expect(allUsers[0]).toEqual(expect.objectContaining(users[0]));

    spy.mockRestore();
  });

  test('It should return empty array if no users available', async () => {
    const spy = jest.spyOn(fs, 'readFile').mockResolvedValue(JSON.stringify([]) as never);

    const fileUserRepository = new FileUserRepository();
    const allUsers = await fileUserRepository.findAll();

    expect(allUsers).toBeInstanceOf(Array);
    expect(allUsers).toHaveLength(0);

    spy.mockRestore();
  });

});
