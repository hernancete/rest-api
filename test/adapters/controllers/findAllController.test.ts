import { Request, Response } from 'express';
import { findAllController } from '../../../src/adapters/controllers/findAllController';
import { FindAllUseCase }  from '../../../src/application/useCases/findAllUseCase';
import { users } from '../../data';

describe('Find all adapter', () => {

  test('It should execute the use case with correct parameters: no users', async () => {

    const spy = jest.spyOn(FindAllUseCase.prototype, 'execute').mockResolvedValue([] as never);

    const res = {
      json: jest.fn()
    } as any;

    await findAllController({} as Request, res);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({});
    expect(res.json).toHaveBeenCalledWith([]);

    spy.mockRestore();
  });

  test('It should execute the use case with correct parameters: ten users', async () => {

    const spy = jest.spyOn(FindAllUseCase.prototype, 'execute').mockResolvedValue(users as never);

    const res = {
      json: jest.fn()
    } as any;

    await findAllController({} as Request, res);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({});
    expect(res.json).toHaveBeenCalledWith(users);

    spy.mockRestore();
  });

  test('It should execute the use case with correct parameters: pagination filters', async () => {

    const spy = jest.spyOn(FindAllUseCase.prototype, 'execute').mockResolvedValue([] as never);

    const req = {
      query: {
        page: '1',
        limit: '4',
      }
    } as any;
    const res = {
      json: jest.fn()
    } as any;

    await findAllController(req, res);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ page: '1', limit: '4' });
    expect(res.json).toHaveBeenCalledWith([]);

    spy.mockRestore();
  });

  test('It should execute the use case with correct parameters: sorting filters', async () => {

    const spy = jest.spyOn(FindAllUseCase.prototype, 'execute').mockResolvedValue([] as never);

    const req = {
      query: {
        sortBy: 'name',
        sortDirection: 'descending',
      }
    } as any;
    const res = {
      json: jest.fn()
    } as any;

    await findAllController(req, res);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ sortBy: 'name', sortDirection: 'descending' });
    expect(res.json).toHaveBeenCalledWith([]);

    spy.mockRestore();
  });

  test('It should execute the use case with correct parameters: matching filters', async () => {

    const spy = jest.spyOn(FindAllUseCase.prototype, 'execute').mockResolvedValue([] as never);

    const req = {
      query: {
        'match[name]': 'Will',
        'match[last_name]': 'Doe',
      }
    } as any;
    const res = {
      json: jest.fn()
    } as any;

    await findAllController(req, res);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({ 'match[name]': 'Will', 'match[last_name]': 'Doe' });
    expect(res.json).toHaveBeenCalledWith([]);

    spy.mockRestore();
  });

});
