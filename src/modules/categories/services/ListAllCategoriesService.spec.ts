import AppError from "@shared/errors/AppError";
import FakeCategoriesRepository from "../repositories/fakes/FakeCategoriesRepository";
import ListAllCategoriesService from "./ListAllCategories";

let fakeCategoriesRepository: FakeCategoriesRepository;
let listAllCategories: ListAllCategoriesService;


describe('ListAllCategoriesService', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    listAllCategories = new ListAllCategoriesService(
      fakeCategoriesRepository
    );
  });

  it('should be able to list the categories', async () => {
    await fakeCategoriesRepository.create({
      name: 'Foo',
    });

    await fakeCategoriesRepository.create({
      name: 'Foo2',
    });
    
    const categories = await listAllCategories.execute();

    expect(categories.length >= 2).toBeTruthy();
  });

  it('should not be able to list the categories if categories.length have 0', async () => {
    await expect(listAllCategories.execute()).rejects.toBeInstanceOf(AppError);
  });
});