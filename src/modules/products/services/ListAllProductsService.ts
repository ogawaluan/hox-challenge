import { inject, injectable } from "tsyringe";

import Product from "../infra/typeorm/entities/Product";
import IProductsRepository from "../repositories/IProductsRepository";
import AppError from "@shared/errors/AppError";

@injectable()
class ListAllProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(): Promise<Product[]> {
    const products = await this.productsRepository.findAllProducts();

    if (!products) {
      throw new AppError('products not found');
    }

    if (products.length === 0) {
      throw new AppError('You have no registered products');
    }

    return products;
  }
}

export default ListAllProductsService;