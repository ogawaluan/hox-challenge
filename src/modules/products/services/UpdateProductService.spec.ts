import FakeCategoriesRepository from "@modules/categories/repositories/fakes/FakeCategoriesRepository";
import AppError from "@shared/errors/AppError";
import FakeProductsRepository from "../repositories/fakes/FakeProductsRepository";
import CreateProductService from "./CreateProductService";
import UpdateProductService from "./UpdateProductService";

let fakeProductsRepository: FakeProductsRepository;
let fakeCategoriesRepository: FakeCategoriesRepository;
let createProductService: CreateProductService;
let updateProductService: UpdateProductService;

describe('UpdateProductService', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    fakeCategoriesRepository = new FakeCategoriesRepository();

    createProductService = new CreateProductService(
      fakeProductsRepository,
      fakeCategoriesRepository
    );

    updateProductService = new UpdateProductService(
      fakeProductsRepository,
    );
  });

  it('should be able to update a product', async () => {
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

    const updateProduct = await updateProductService.execute({
      product_id: product.id,
      name: 'banana2',
      expirationDate: '10-12-2020',
      manufacturingDate: '9-12-2020',
      perishableProduct: false,
      price: 150.35,
    });

    expect(updateProduct.name).toBe('banana2');
  });

  it('should not be able to update a product with invalid product_id', async () => {
    await expect(updateProductService.execute({
      product_id: 'ablubleble',
      name: 'banana2',
      expirationDate: '10-12-2020',
      manufacturingDate: '9-12-2020',
      perishableProduct: false,
      price: 150.35,
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a product with manufacturingDate higher than expirationDate', async () => {
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

    await expect(updateProductService.execute({
      product_id: product.id,
      name: 'banana2',
      expirationDate: '9-12-2020',
      manufacturingDate: '10-12-2020',
      perishableProduct: false,
      price: 150.35,
    })).rejects.toBeInstanceOf(AppError);
  });
});