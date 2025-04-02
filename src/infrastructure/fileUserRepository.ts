import { readFile } from 'fs/promises';
import path from 'path';
import { UserRepositoryInterface } from '../application/userRepositoryInterface';
import { User } from '../domain/user';

const STORAGE = process.env.STORAGE || 'storage/users.json';

export class FileUserRepository implements UserRepositoryInterface {

  async findAll(): Promise<User[]> {
    const file = path.resolve(__dirname, '..', '..', STORAGE);
    const users = await readFile(file);
    return JSON.parse(users.toString());
  }

  async create(user: User): Promise<User> {
    return Promise.resolve(user);
  }

  async update(user: Partial<User>): Promise<User> {
    return Promise.resolve(user as User);
  }

  async delete(id: string): Promise<string> {
    return Promise.resolve(id);
  }

};
