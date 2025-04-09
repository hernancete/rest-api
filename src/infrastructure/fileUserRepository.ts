import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { Filters, UserRepositoryInterface } from '../application/userRepositoryInterface';
import { User } from '../domain/user';

const API_STORAGE = process.env.API_STORAGE || 'storage/users.json';
const file = path.resolve(__dirname, '..', '..', API_STORAGE);

export class FileUserRepository implements UserRepositoryInterface {

  async findAll(filters?: Filters): Promise<User[]> {

    const usersBuffer = await readFile(file);
    let users: User[] = JSON.parse(usersBuffer.toString());

    users = matching(users, filters);
    sorting(users, filters);
    users = pagination(users, filters);

    return users;
  }

  async create(user: User): Promise<User> {

    // simulate a db's primary key
    if (!user.wallet_id) throw new Error('Invalid user');

    const usersBuffer = await readFile(file);
    const users = JSON.parse(usersBuffer.toString());
    const updatedUsers = [...users, user];
    await writeFile(file, JSON.stringify(updatedUsers));
    return user;
  }

  async update(id: string, user: Partial<User>): Promise<User> {

    const usersBuffer = await readFile(file);
    const users = JSON.parse(usersBuffer.toString());

    const userIndex = users.findIndex((u: User) => u.wallet_id === id);
    if (userIndex === -1) throw new Error('User not found');

    const uppdatedUser = {
      ...users[userIndex],
      ...user,
    };
    users.splice(userIndex, 1, uppdatedUser);
    await writeFile(file, JSON.stringify(users));
    return Promise.resolve(uppdatedUser);
  }

  async delete(id: string): Promise<void> {
    const usersBuffer = await readFile(file);
    const users = JSON.parse(usersBuffer.toString());
    const userIndex = users.findIndex((u: User) => u.wallet_id === id);
    if (userIndex !== -1) {
      users.splice(userIndex, 1);
      await writeFile(file, JSON.stringify(users));
    }
  }

};

function pagination(users: User[], filters?: Filters) {
  let start = 0;
  let end;
  if (filters && filters.page && filters.limit) {
    start = ((filters.page || 1) -1) * (filters.limit || 0);
  }
  if (filters && filters.limit) {
    end = start + (filters.limit || 0);
  }
  return users.slice(start, end);
}

function sorting(users: User[], filters?: Filters) {
  if (filters && filters.sortBy) {
    const sortBy = filters.sortBy!;
    const sortFactor = filters.sortDirection === 'descending' ? -1 : 1;
    users.sort((a: User, b: User) => {
      if (!a[sortBy] && !b[sortBy]) return 0;
      if (!a[sortBy]) return 1;
      if (!b[sortBy]) return -1;

      if (a[sortBy] < b[sortBy]) return -1 * sortFactor;
      if (a[sortBy] > b[sortBy]) return 1 * sortFactor;

      return 0;
    });
  }
}

function matching(users: User[], filters?: Filters) {
  if (filters && filters.match) {
    const match = filters.match!;
    users = users.filter((u: User) => {
      return Object.keys(match).every(field => {
        const reg = new RegExp(match[field], 'i');
        return reg.test(u[field as keyof User]!);
      });
    });
  }
  return users;
}
