import fs from 'fs/promises';
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

  describe('Sorting', () => {
    // sortBy=email&sortDirection=ascending

    test('It should sort by birth_date', async() => {
      const spy = jest.spyOn(fs, 'readFile').mockResolvedValue(Buffer.from(JSON.stringify(users)));

      const sortBy = 'birth_date';

      const expectedUsersIds = [
        "4cdc85d4-ddb4-4575-bb22-d97ad4fa2466",  // 1944-07-30T15:02:05.276Z
        "03c82ec7-419e-49a5-9982-74c4cb089430",
        "1762144a-2e1c-4902-99ef-85719e6afeae",
        "356173cd-89f2-4c90-b072-2e30bf2f2ee0",
        "ffd155ed-2753-4834-94b7-26390421eb4b",
        "1ac4d760-c1c8-49ab-a209-d34d476dc5b6",
        "7aac4624-c9d0-4ed0-aceb-6babd8dceb66",
        "7b989385-555b-4d99-89b2-8f23eb1020e7",
        "98917d00-9c5b-4642-abf5-5b7c99c7c2ed",
        "66c79e23-e29f-452c-8bb2-c73be2b84b76",  // 2005-05-25T02:38:47.867Z
      ];

      const fileUserRepository = new FileUserRepository();
      const allUsers = await fileUserRepository.findAll({sortBy});

      expect(allUsers).toBeInstanceOf(Array);
      expect(allUsers).toHaveLength(10);
      expect(allUsers.map(u => u.wallet_id)).toEqual(expectedUsersIds);

      spy.mockRestore();
    });

    test('It should sort by name in descending order', async() => {
      const spy = jest.spyOn(fs, 'readFile').mockResolvedValue(Buffer.from(JSON.stringify(users)));

      const sortBy = 'name';
      const sortDirection = 'descending';

      const expectedUsersIds = [
        "66c79e23-e29f-452c-8bb2-c73be2b84b76",  // Zelda
        "7b989385-555b-4d99-89b2-8f23eb1020e7",
        "7aac4624-c9d0-4ed0-aceb-6babd8dceb66",
        "ffd155ed-2753-4834-94b7-26390421eb4b",
        "03c82ec7-419e-49a5-9982-74c4cb089430",
        "98917d00-9c5b-4642-abf5-5b7c99c7c2ed",
        "4cdc85d4-ddb4-4575-bb22-d97ad4fa2466",
        "1762144a-2e1c-4902-99ef-85719e6afeae",
        "356173cd-89f2-4c90-b072-2e30bf2f2ee0",
        "1ac4d760-c1c8-49ab-a209-d34d476dc5b6",  // Amparo
      ];

      const fileUserRepository = new FileUserRepository();
      const allUsers = await fileUserRepository.findAll({sortBy, sortDirection});

      expect(allUsers).toBeInstanceOf(Array);
      expect(allUsers).toHaveLength(10);
      expect(allUsers.map(u => u.wallet_id)).toEqual(expectedUsersIds);

      spy.mockRestore();
    });

    test('It should sort by last_name in ascending order event if is not set', async() => {
      const modifiedUsersIds = [
        "98917d00-9c5b-4642-abf5-5b7c99c7c2ed",
        "03c82ec7-419e-49a5-9982-74c4cb089430",
        "ffd155ed-2753-4834-94b7-26390421eb4b",
      ];
      users.map((u: User) => {
        if (modifiedUsersIds.includes(u.wallet_id)) delete u.last_name;
      });

      const spy = jest.spyOn(fs, 'readFile').mockResolvedValue(Buffer.from(JSON.stringify(users)));

      const sortBy = 'last_name';
      const sortDirection = 'ascending';

      const expectedUsersIds = [
        "1762144a-2e1c-4902-99ef-85719e6afeae",  // Boyle
        "1ac4d760-c1c8-49ab-a209-d34d476dc5b6",
        "7b989385-555b-4d99-89b2-8f23eb1020e7",
        "356173cd-89f2-4c90-b072-2e30bf2f2ee0",
        "7aac4624-c9d0-4ed0-aceb-6babd8dceb66",
        "66c79e23-e29f-452c-8bb2-c73be2b84b76",
        "4cdc85d4-ddb4-4575-bb22-d97ad4fa2466",  // Torp-Vandervort
        "98917d00-9c5b-4642-abf5-5b7c99c7c2ed",  // no last_name
        "03c82ec7-419e-49a5-9982-74c4cb089430",  // no last_name
        "ffd155ed-2753-4834-94b7-26390421eb4b",  // no last_name
      ];

      const fileUserRepository = new FileUserRepository();
      const allUsers = await fileUserRepository.findAll({sortBy, sortDirection});

      expect(allUsers).toBeInstanceOf(Array);
      expect(allUsers).toHaveLength(10);
      expect(allUsers.map(u => u.wallet_id)).toEqual(expectedUsersIds);

      spy.mockRestore();
    });

    test('It should sort by last_name in descending order event if is not set', async() => {
      const modifiedUsersIds = [
        "98917d00-9c5b-4642-abf5-5b7c99c7c2ed",
        "03c82ec7-419e-49a5-9982-74c4cb089430",
        "ffd155ed-2753-4834-94b7-26390421eb4b",
      ];
      users.map((u: User) => {
        if (modifiedUsersIds.includes(u.wallet_id)) delete u.last_name;
      });

      const spy = jest.spyOn(fs, 'readFile').mockResolvedValue(Buffer.from(JSON.stringify(users)));

      const sortBy = 'last_name';
      const sortDirection = 'descending';

      const expectedUsersIds = [
        "4cdc85d4-ddb4-4575-bb22-d97ad4fa2466",  // Torp-Vandervort
        "7aac4624-c9d0-4ed0-aceb-6babd8dceb66",
        "66c79e23-e29f-452c-8bb2-c73be2b84b76",
        "356173cd-89f2-4c90-b072-2e30bf2f2ee0",
        "7b989385-555b-4d99-89b2-8f23eb1020e7",
        "1ac4d760-c1c8-49ab-a209-d34d476dc5b6",
        "1762144a-2e1c-4902-99ef-85719e6afeae",  // Boyle
        "98917d00-9c5b-4642-abf5-5b7c99c7c2ed",  // no last_name
        "03c82ec7-419e-49a5-9982-74c4cb089430",  // no last_name
        "ffd155ed-2753-4834-94b7-26390421eb4b",  // no last_name
      ];

      const fileUserRepository = new FileUserRepository();
      const allUsers = await fileUserRepository.findAll({sortBy, sortDirection});

      expect(allUsers).toBeInstanceOf(Array);
      expect(allUsers).toHaveLength(10);
      expect(allUsers.map(u => u.wallet_id)).toEqual(expectedUsersIds);

      spy.mockRestore();
    });
  });

});
