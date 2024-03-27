import { ModelCtor, Sequelize } from 'sequelize-typescript'
import { RepositoryInterface } from '../domain/@shared/repository/repository.interface'

export function MockRepository<T>(): jest.Mocked<RepositoryInterface<T>> {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
  }
}

export function setupSequelize(models: ModelCtor[]) {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })
    sequelize.addModels(models)
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })
}
