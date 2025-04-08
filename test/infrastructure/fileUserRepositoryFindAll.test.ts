import fs from 'fs/promises';
import { v4 } from 'uuid';
import { FileUserRepository } from '../../src/infrastructure/fileUserRepository';
import { User } from '../../src/domain/user';
import { users } from '../data';

describe('File user repository', () => {

  describe('Find all users', () => {

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

  describe('Pagination', () => {

    test('It should paginate the results if asked to do it', async () => {
      const spy = jest.spyOn(fs, 'readFile').mockResolvedValue(Buffer.from(JSON.stringify(users)));

      const page = 2;
      const limit = 4;
      const expectedUsersIds = [
        '1762144a-2e1c-4902-99ef-85719e6afeae',
        '03c82ec7-419e-49a5-9982-74c4cb089430',
        '356173cd-89f2-4c90-b072-2e30bf2f2ee0',
        'ffd155ed-2753-4834-94b7-26390421eb4b',
      ];
      const nonExpectedUsersIds = [
        '98917d00-9c5b-4642-abf5-5b7c99c7c2ed',
        '66c79e23-e29f-452c-8bb2-c73be2b84b76',
      ];

      const fileUserRepository = new FileUserRepository();
      const allUsers = await fileUserRepository.findAll({page, limit});

      expect(allUsers).toBeInstanceOf(Array);
      expect(allUsers).toHaveLength(4);
      expect(allUsers.map(u => u.wallet_id)).toEqual(expect.arrayContaining(expectedUsersIds));
      expect(allUsers.map(u => u.wallet_id)).not.toEqual(expect.arrayContaining(nonExpectedUsersIds));

      spy.mockRestore();
    });

    test('It should paginate the results if asked to do it, different values', async () => {
      const spy = jest.spyOn(fs, 'readFile').mockResolvedValue(Buffer.from(JSON.stringify(users)));

      const page = 1;
      const limit = 3;

      const expectedUsersIds = [
        '1ac4d760-c1c8-49ab-a209-d34d476dc5b6',
        '98917d00-9c5b-4642-abf5-5b7c99c7c2ed',
        '7aac4624-c9d0-4ed0-aceb-6babd8dceb66',
      ];

      const fileUserRepository = new FileUserRepository();
      const allUsers = await fileUserRepository.findAll({page, limit});

      expect(allUsers).toBeInstanceOf(Array);
      expect(allUsers).toHaveLength(3);
      expect(allUsers.map(u => u.wallet_id)).toEqual(expect.arrayContaining(expectedUsersIds));

      spy.mockRestore();
    });

    test('It should paginate the results with just limit', async () => {
      const spy = jest.spyOn(fs, 'readFile').mockResolvedValue(Buffer.from(JSON.stringify(users)));

      const limit = 3;

      const expectedUsersIds = [
        '1ac4d760-c1c8-49ab-a209-d34d476dc5b6',
        '98917d00-9c5b-4642-abf5-5b7c99c7c2ed',
        '7aac4624-c9d0-4ed0-aceb-6babd8dceb66',
      ];

      const fileUserRepository = new FileUserRepository();
      const allUsers = await fileUserRepository.findAll({limit});

      expect(allUsers).toBeInstanceOf(Array);
      expect(allUsers).toHaveLength(3);
      expect(allUsers.map(u => u.wallet_id)).toEqual(expect.arrayContaining(expectedUsersIds));

      spy.mockRestore();
    });

  });

});
