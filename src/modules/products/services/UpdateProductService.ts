import { inject, injectable } from "tsyringe";
import { format } from 'date-fns';

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
      throw new AppError('product not found');
    }
    
    const manufacturingDateFormatted = format(new Date(manufacturingDate), "dd/MM/yyyy");
    const expirationDateFormatted = format(new Date(expirationDate), "dd/MM/yyyy");
    
    if (manufacturingDateFormatted >= expirationDateFormatted) {
      throw new AppError('manufacturingDate is higher than expirationDate');
    }

    product.name = name;
    product.manufacturingDate = manufacturingDateFormatted;
    product.perishableProduct = perishableProduct;
    product.expirationDate = expirationDateFormatted;
    product.price = price;

    return this.productsRepository.save(product);
  }
}

export default UpdateProductService;