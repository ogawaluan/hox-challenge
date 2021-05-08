import { getRepository, Repository } from "typeorm";

import Product from "../entities/Product";
import IProductsRepository from "@modules/products/repositories/IProductsRepository";
import ICreateProductDTO from "@modules/products/dtos/ICreateProductDTO";

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({ 
    category_id,
    name,
    expirationDate,
    manufacturingDate,
    perishableProduct,
    price,
  }: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create({
      category_id,
      name,
      expirationDate,
      manufacturingDate,
      perishableProduct,
      price,
    });

    await this.ormRepository.save(product);

    return product;
  }

  public async save(product: Product): Promise<Product> {
    return this.ormRepository.save(product);
  }

  public async findAllProducts(): Promise<Product[] | undefined> {
    const products = await this.ormRepository.find();

    return products;
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne(id);
  
    return product;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: { name, },
    });

    return product;
  }

  public async delete(id: string): Promise<any> {
    return this.ormRepository.delete({ id });
  }
}

export default ProductsRepository;