import AppError from '@shared/errors/AppError';
import FakeCategoriesRepository from '../repositories/fakes/FakeCategoriesRepository';
import CreateCategoryService from './CreateCategoryService';

let fakeCategoriesRepository: FakeCategoriesRepository;
let createCategoryService: CreateCategoryService;

describe('CreateCategoryService', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    createCategoryService = new CreateCategoryService(
      fakeCategoriesRepository
    );
  });

  it('should be able to create a category', async () => {
    const category = await createCategoryService.execute({
      name: 'Foo'
    });

    expect(category).toHaveProperty('id');
  });

  it('should not be able to create a category with same name', async () => {
    await fakeCategoriesRepository.create({
      name: 'Foo'
    });

    await expect(createCategoryService.execute({
      name: 'Foo'
    })).rejects.toBeInstanceOf(AppError);
  });
});