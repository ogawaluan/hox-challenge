import FakeCategoriesRepository from "../repositories/fakes/FakeCategoriesRepository";
import ShowCategoryService from "./ShowCategoryService";
import AppError from "@shared/errors/AppError";

let fakeCategoriesRepository: FakeCategoriesRepository;
let showCategoryService: ShowCategoryService;

describe('ShowCategoryService', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    showCategoryService = new ShowCategoryService(
      fakeCategoriesRepository
    );
  });

  it('should be able to show one category', async () => {
    const category = await fakeCategoriesRepository.create({
      name: 'Foo',
    });

    const response = await showCategoryService.execute({
      category_id: category.id,
    });

    expect(response).toHaveProperty('id');
  });

  it('should not be able to show one category with invalid id', async () => {
    await expect(showCategoryService.execute({
      category_id: 'ablublelbe',
    })).rejects.toBeInstanceOf(AppError);
  });
});