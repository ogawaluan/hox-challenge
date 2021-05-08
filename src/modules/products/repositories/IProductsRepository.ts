import Product from "@modules/products/infra/typeorm/entities/Product";
import ICreateProductDTO from "@modules/products/dtos/ICreateProductDTO";

export default interface IProductsRepository {
  create(data: ICreateProductDTO): Promise<Product>;
  save(product: Product): Promise<Product>;
  findAllProducts(): Promise<Product[] | undefined>;
  findById(id: string): Promise<Product | undefined>;
  findByName(name: string): Promise<Product | undefined>;
  delete(id: string): Promise<any>;
}