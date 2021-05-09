import FakeCategoriesRepository from "@modules/categories/repositories/fakes/FakeCategoriesRepository";
import AppError from "@shared/errors/AppError";
import FakeProductsRepository from "../repositories/fakes/FakeProductsRepository";
import CreateProductService from "./CreateProductService";
import DeleteProductService from "./DeleteProductService";
import ListAllProductsService from "./ListAllProductsService";

let fakeProductsRepository: FakeProductsRepository;
let fakeCategoriesRepository: FakeCategoriesRepository;
let createProductService: CreateProductService;
let listAllProducts: ListAllProductsService;
let deleteProductService: DeleteProductService;

describe('DeleteProductService', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    fakeCategoriesRepository = new FakeCategoriesRepository();

    createProductService = new CreateProductService(
      fakeProductsRepository,
      fakeCategoriesRepository,
    );

    listAllProducts = new ListAllProductsService(
      fakeProductsRepository,
    );

    deleteProductService = new DeleteProductService(
      fakeProductsRepository,
    );
  });

  it('should be able to delete a product', async () => {
    let page = 1;
    let category_id
    let sortField
    let sortOrder

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

    const product2 = await createProductService.execute({
      category_id: category.id,
      name: 'banana2',
      expirationDate: '12-12-2020',
      manufacturingDate: '10-12-2020',
      perishableProduct: true,
      price: 150.30,
    });

    await deleteProductService.execute({
      product_id: product.id,
    });

    const products = await listAllProducts.execute({
      page,
      category_id,
      sortField,
      sortOrder,
    });

    expect(products.find(findProduct => findProduct.id === product.id)).toBeUndefined();
  });

  it('should not be able to delete a product with a non-existing product_id', async () => {
    await expect(deleteProductService.execute({
      product_id: 'ablubleble',
    })).rejects.toBeInstanceOf(AppError);
  });
});