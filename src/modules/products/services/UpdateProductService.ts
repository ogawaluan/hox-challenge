import { inject, injectable } from "tsyringe";

import Product from "../infra/typeorm/entities/Product";
import IProductsRepository from "../repositories/IProductsRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  product_id: string;
  name: string;
  manufacturingDate: string;
  perishableProduct: boolean;
  expirationDate: string;
  price: number;
}

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    product_id,
    name,
    manufacturingDate,
    perishableProduct,
    expirationDate,
    price,
  }: IRequest): Promise<Product> {
    const product = await this.productsRepository.findById(product_id);

    if (!product) {
      throw new AppError('product not found', 404);
    }
    
    const manufacturing = new Date(manufacturingDate).toISOString();
    const expiration = new Date(expirationDate).toISOString();
    
    if (manufacturing >= expiration) {
      throw new AppError('manufacturingDate is higher than expirationDate', 400);
    }

    product.name = name;
    product.manufacturingDate = manufacturing;
    product.perishableProduct = perishableProduct;
    product.expirationDate = expiration;
    product.price = price;

    return this.productsRepository.save(product);
  }
}

export default UpdateProductService;