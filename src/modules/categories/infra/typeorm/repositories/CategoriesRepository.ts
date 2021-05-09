import { getRepository, Repository } from "typeorm";

import Category from "../entities/Category";
import ICategoriesRepository from "@modules/categories/repositories/ICategoriesRepository";
import ICreateCategoryDTO from "@modules/categories/dtos/ICreateCategoryDTO";

class CategoriesRepository implements ICategoriesRepository {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  public async create({ name }: ICreateCategoryDTO): Promise<Category> {
    const category = this.ormRepository.create({
      name,
    });

    await this.ormRepository.save(category);

    return category;
  }

  public async save(category: Category): Promise<Category> {
    return this.ormRepository.save(category);
  }

  public async findAllCategories(sortField: string, sortOrder: string, limit: number, offset: number): Promise<Category[] | undefined> {
    if (sortField) {
      const products = await this.ormRepository.find({
        order: {
          [sortField]: sortOrder = 'desc' ? 'DESC' : 'ASC',
        },
        skip: offset,
        take: limit,
      });
  
      return products;
    } else {
      const products = await this.ormRepository.find({
        skip: offset,
        take: limit,
      });
  
      return products;
    }
  }

  public async findById(id: string): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne(id);
  
    return category;
  }

  public async findByName(name: string): Promise<Category | undefined> {
    const category = await this.ormRepository.findOne({
      where: { name, },
    });

    return category;
  }

  public async delete(id: string): Promise<any> {
    return this.ormRepository.delete({ id });
  }
}

export default CategoriesRepository;