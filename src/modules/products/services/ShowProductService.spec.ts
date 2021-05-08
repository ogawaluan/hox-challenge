import FakeCategoriesRepository from "@modules/categories/repositories/fakes/FakeCategoriesRepository";
import FakeProductsRepository from "../repositories/fakes/FakeProductsRepository";
import CreateProductService from "./CreateProductService";
import ShowProductService from "./ShowProductService";
import AppError from "@shared/errors/AppError";

let fakeProductsRepository: FakeProductsRepository;
let fakeCategoriesRepository: FakeCategoriesRepository;
let createProductService: CreateProductService;
let showProductService: ShowProductService;

describe('ShowProductService', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    fakeCategoriesRepository = new FakeCategoriesRepository();

    createProductService = new CreateProductService(
      fakeProductsRepository,
      fakeCategoriesRepository
    );

    showProductService = new ShowProductService(
      fakeProductsRepository
    );
  });

  it('should be able to show one product', async () => {
    const category = await fakeCategoriesRepository.create({
      name: 'Foo'
    });

    const product1 = await createProductService.execute({
      category_id: category.id,
      name: 'banana',
      expirationDate: '12-12-2020',
      manufacturingDate: '10-12-2020',
      perishableProduct: true,
      price: 150.30,
    });

    const response = await showProductService.execute({
      product_id: product1.id,
    });

    expect(response).toHaveProperty('id');
  });

  it('should not be able to show a product with invalid product_id', async () => {
    await expect(showProductService.execute({
      product_id: 'ablubleble',
    })).rejects.toBeInstanceOf(AppError);
  });
});