import FakeCategoriesRepository from "@modules/categories/repositories/fakes/FakeCategoriesRepository";
import AppError from "@shared/errors/AppError";
import FakeProductsRepository from "../repositories/fakes/FakeProductsRepository";
import CreateProductService from "./CreateProductService";

let fakeProductsRepository: FakeProductsRepository;
let fakeCategoriesRepository: FakeCategoriesRepository;
let createProductService: CreateProductService;


describe('CreateProductService', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    fakeCategoriesRepository = new FakeCategoriesRepository();

    createProductService = new CreateProductService(
      fakeProductsRepository,
      fakeCategoriesRepository
    );
  });

  it('should be able to create a product', async () => {
    const category = await fakeCategoriesRepository.create({
      name: 'Foo'
    });

    const product = await createProductService.execute({
      category_id: category.id,
      name: 'banana',
      expirationDate: '12-12-2020',
      manufacturingDate: '10-12-2020',
      perishableProduct: true,
      price: 150.30,
    });

    expect(product).toHaveProperty('id');
  });

  it('should not be able to create a product with invalid category_id', async () => {
    await expect(createProductService.execute({
      category_id: 'ableble',
      name: 'banana',
      expirationDate: '12-12-2020',
      manufacturingDate: '10-12-2020',
      perishableProduct: true,
      price: 150.30,
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a product with manufacturingDate higher than expirationDate', async () => {
    const category = await fakeCategoriesRepository.create({
      name: 'Foo'
    });

    await expect(createProductService.execute({
      category_id: category.id,
      name: 'banana',
      expirationDate: '10-12-2020',
      manufacturingDate: '12-12-2020',
      perishableProduct: true,
      price: 150.30,
    })).rejects.toBeInstanceOf(AppError);
  });
});