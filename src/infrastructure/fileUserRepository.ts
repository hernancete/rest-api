import { readFile } from 'fs/promises';
import { UserRepositoryInterface } from '../application/userRepositoryInterface';
import { User } from '../domain/user';

export class FileUserRepository implements UserRepositoryInterface {

  async findAll(): Promise<User[]> {
    const users = await readFile('myFile.json');
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
