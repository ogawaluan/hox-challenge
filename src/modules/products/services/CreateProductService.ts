import { inject, injectable } from "tsyringe";

import Product from "../infra/typeorm/entities/Product";
import IProductsRepository from "../repositories/IProductsRepository";
import ICategoriesRepository from "@modules/categories/repositories/ICategoriesRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  category_id: string;
  name: string;
  manufacturingDate: string;
  perishableProduct: boolean;
  expirationDate: string;
  price: number;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({
    category_id,
    name,
    manufacturingDate,
    perishableProduct,
    expirationDate,
    price,
  }: IRequest): Promise<Product> {
    const checkCategoryExist = await this.categoriesRepository.findById(category_id);

    if (!checkCategoryExist) {
      throw new AppError('Category not found', 404);
    }

    const manufacturing = new Date(manufacturingDate).toISOString();
    const expiration = new Date(expirationDate).toISOString();
    
    if (manufacturing >= expiration) {
      throw new AppError('manufacturingDate is higher than expirationDate', 400);
    }

    const product = await this.productsRepository.create({
      category_id,
      name,
      manufacturingDate: manufacturing,
      perishableProduct,
      expirationDate: expiration,
      price,
    });

    return product;
  }
}

export default CreateProductService;