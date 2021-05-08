import AppError from "@shared/errors/AppError";
import FakeCategoriesRepository from "../repositories/fakes/FakeCategoriesRepository";
import CreateCategoryService from "./CreateCategoryService";
import UpdateCategoryService from "./UpdateCategoryService";

let fakeCategoriesRepository: FakeCategoriesRepository;
let createCategoryService: CreateCategoryService;
let updateCategoryService: UpdateCategoryService;

describe('UpdateCategoryService', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();

    createCategoryService = new CreateCategoryService(
      fakeCategoriesRepository
    );

    updateCategoryService = new UpdateCategoryService(
      fakeCategoriesRepository
    );
  });

  it('should be able to update a category', async () => {
    const category = await createCategoryService.execute({
      name: 'Foo'
    });

    const updatedCategory = await updateCategoryService.execute({
      category_id: category.id,
      name: 'Foo2'
    });

    expect(updatedCategory.name).toBe('Foo2');
  });

  it('should not be able to update from a non-existing category', async () => {
    await expect(updateCategoryService.execute({
      category_id: 'FOo',
      name: 'Foo157',      
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update to another category name', async () => {
    await fakeCategoriesRepository.create({
      name: 'Foo',
    });

    const category = await fakeCategoriesRepository.create({
      name: 'Foo2',
    });

    await expect(updateCategoryService.execute({
      category_id: category.id,
      name: 'Foo',
    })).rejects.toBeInstanceOf(AppError);
  });
});