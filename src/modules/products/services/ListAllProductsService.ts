import { inject, injectable } from "tsyringe";

import Product from "../infra/typeorm/entities/Product";
import IProductsRepository from "../repositories/IProductsRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  page: number;
  category_id?: string;
  sortField: any;
  sortOrder: any;
}

@injectable()
class ListAllProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ page, category_id, sortField, sortOrder }: IRequest): Promise<Product[]> {
    let limit;

    if (!limit) {
      limit = 10;
    }

    if (page) {
      limit = 10;
    }

    let offset = (page * 10) - 10;

    if (offset < 0) {
      offset = 0;
    }

    const products = await this.productsRepository.findAllProducts(
      sortField,
      sortOrder,
      limit,
      offset,
      category_id,
    );

    if (!products) {
      throw new AppError('products not found', 404);
    }

    if (products.length === 0) {
      throw new AppError('You have no registered products', 400);
    }

    return products;
  }
}

export default ListAllProductsService;