import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { UserRepositoryInterface } from '../application/userRepositoryInterface';
import { User } from '../domain/user';

const STORAGE = process.env.STORAGE || 'storage/users.json';
const file = path.resolve(__dirname, '..', '..', STORAGE);

export class FileUserRepository implements UserRepositoryInterface {

  async findAll(): Promise<User[]> {
    const users = await readFile(file);
    return JSON.parse(users.toString());
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

  async update(user: Partial<User>): Promise<User> {
    return Promise.resolve(user as User);
  }

  async delete(id: string): Promise<void> {
    const usersBuffer = await readFile(file);
    const users = JSON.parse(usersBuffer.toString());
    const userIndex = users.findIndex((u: User) => u.wallet_id === id);
    users.splice(userIndex, 1);
    await writeFile(file, JSON.stringify(users));
  }

};
