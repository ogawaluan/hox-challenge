import { v4 as uuid } from 'uuid';

import Product from "@modules/products/infra/typeorm/entities/Product";
import IProductsRepository from "@modules/products/repositories/IProductsRepository";
import ICreateProductDTO from "@modules/products/dtos/ICreateProductDTO";

class FakeProductsRepository implements IProductsRepository {
  private products: Product[] = [];

  public async create(productData: ICreateProductDTO): Promise<Product> {
    const product = new Product();

    Object.assign(product, { id: uuid() }, productData);

    this.products.push(product);

    return product;
  }

  public async save(product: Product): Promise<Product> {
    const findIndex = this.products.findIndex(findProduct => findProduct.id === product.id);

    this.products[findIndex] = product;

    return product;
  }

  public async findAllProducts(): Promise<Product[] | undefined> {
    return this.products;
  }

  public async findById(id: string): Promise<Product | undefined> {
    const findProduct = this.products.find(product => product.id === id);

    return findProduct;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const findProduct = this.products.find(product => product.name === name);

    return findProduct;
  }

  public async delete(id: string): Promise<any> {
    const findIndex = this.products.findIndex(findProduct => findProduct.id === id);

    return this.products.splice(findIndex, 1);
  }
}

export default FakeProductsRepository;