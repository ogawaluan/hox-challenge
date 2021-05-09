import { inject, injectable } from "tsyringe";

import Product from "../infra/typeorm/entities/Product";
import IProductsRepository from "../repositories/IProductsRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  product_id: string;
}

@injectable()
class DeleteProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ product_id }: IRequest): Promise<Product> {
    const product = await this.productsRepository.findById(product_id);

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    await this.productsRepository.delete(product_id);

    return product;
  }
}

export default DeleteProductService;