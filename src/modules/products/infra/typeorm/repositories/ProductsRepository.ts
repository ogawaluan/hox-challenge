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

  public async findAllProducts(
    sortField: string,
    sortOrder: string,
    limit: number,
    offset: number,
    category_id: string | undefined,
  ): Promise<Product[] | undefined> {
    if (category_id && sortField) {
      const products = await this.ormRepository.find({
        where: { category_id },
        order: {
          [sortField]: sortOrder == 'desc' ? 'DESC' : 'ASC',
        },
        skip: offset,
        take: limit,
      });
  
      return products;
    } 
    
    if (category_id) {
      const products = await this.ormRepository.find({
        where: { category_id },
        skip: offset,
        take: limit,
      });
  
      return products;
    }

    if (sortField) {
      const products = await this.ormRepository.find({
        order: {
          [sortField]: sortOrder = 'desc' ? 'DESC' : 'ASC',
        },
        skip: offset,
        take: limit,
      });
  
      return products;
    }

    if (!category_id || !sortField) {
      const products = await this.ormRepository.find({
        skip: offset,
        take: limit,
      });
  
      return products;
    }
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