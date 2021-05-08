import FakeCategoriesRepository from "../repositories/fakes/FakeCategoriesRepository";
import CreateCategoryService from "./CreateCategoryService";
import DeleteCategoryService from "./DeleteCategoryService";
import ListAllCategoriesService from "./ListAllCategories";
import AppError from "@shared/errors/AppError";

let fakeCategoriesRepository: FakeCategoriesRepository;
let createCategoryService: CreateCategoryService;
let deleteCategoryService: DeleteCategoryService;
let listAllCategories: ListAllCategoriesService;

describe('DeleteCategoryService', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    
    createCategoryService = new CreateCategoryService(
      fakeCategoriesRepository
    );

    deleteCategoryService = new DeleteCategoryService(
      fakeCategoriesRepository
    );

    listAllCategories = new ListAllCategoriesService(
      fakeCategoriesRepository
    );
  });

  it('should be able to delete a category', async () => {
    const category = await createCategoryService.execute({
      name: 'Foo',
    });

    const category2 = await createCategoryService.execute({
      name: 'Foo2',
    });

    await deleteCategoryService.execute({
      category_id: category.id,
    });

    const categories = await listAllCategories.execute();

    expect(categories.find(findCategory => findCategory.id === category.id)).toBeUndefined();
  });

  it('should not be able to delete a category with a non-existing category_id', async () => {
    await expect(deleteCategoryService.execute({
      category_id: 'ablubleble',
    })).rejects.toBeInstanceOf(AppError);
  });
});