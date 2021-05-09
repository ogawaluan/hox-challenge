import AppError from "@shared/errors/AppError";
import FakeProductsRepository from "../repositories/fakes/FakeProductsRepository";
import ListAllProductsService from "./ListAllProductsService";

let fakeProductsRepository: FakeProductsRepository;
let listAllProductsService: ListAllProductsService;

describe('ListAllProductsService', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    listAllProductsService = new ListAllProductsService(
      fakeProductsRepository
    );
  });

  it('should be able to list the products', async () => {
    let page = 1;
    let category_id
    let sortField
    let sortOrder

    await fakeProductsRepository.create({
      category_id: 'Foo1',
      name: 'Foo1',
      expirationDate: '12-12-2020',
      manufacturingDate: '10-12-2020',
      perishableProduct: true,
      price: 145.45,
    });

    await fakeProductsRepository.create({
      category_id: 'Foo2',
      name: 'Foo2',
      expirationDate: '12-12-2020',
      manufacturingDate: '10-12-2020',
      perishableProduct: true,
      price: 145.45,
    });

    const products = await listAllProductsService.execute({
      page,
      category_id,
      sortField,
      sortOrder,
    });

    expect(products.length >= 2).toBeTruthy();
  });

  it('should not be able to list the products if products.length have 0', async () => {
    let page = 1;
    let category_id
    let sortField
    let sortOrder

    await expect(listAllProductsService.execute({
      page,
      category_id,
      sortField,
      sortOrder,
    })).rejects.toBeInstanceOf(AppError);
  });
});