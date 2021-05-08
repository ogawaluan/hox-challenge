import Category from "../infra/typeorm/entities/Category";
import ICreateCategoryDTO from "../dtos/ICreateCategoryDTO";

export default interface ICategoriesRepository {
  create(data: ICreateCategoryDTO): Promise<Category>;
  save(category: Category): Promise<Category>;
  findAllCategories(): Promise<Category[] | undefined>;
  findById(id: string): Promise<Category | undefined>;
  findByName(name: string): Promise<Category | undefined>;
  delete(id: string): Promise<any>;
}