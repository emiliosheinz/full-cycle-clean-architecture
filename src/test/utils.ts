import { RepositoryInterface } from '../domain/@shared/repository/repository.interface'

export function MockRepository<T>(): jest.Mocked<RepositoryInterface<T>> {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
  }
}
