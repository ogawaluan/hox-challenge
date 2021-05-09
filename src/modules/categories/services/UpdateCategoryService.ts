import { inject, injectable } from "tsyringe";

import Category from "../infra/typeorm/entities/Category";
import ICategoriesRepository from "../repositories/ICategoriesRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  category_id: string;
  name: string;
}

@injectable()
class UpdateCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}
  
  public async execute({ category_id, name }: IRequest): Promise<Category> {
    const category = await this.categoriesRepository.findById(category_id);

    if (!category) {
      throw new AppError('Category not found', 404);
    }

    const categoryWithSameName = await this.categoriesRepository.findByName(name);

    if (categoryWithSameName) {
      throw new AppError('Category name already exist', 400);
    }

    category.name = name;

    return this.categoriesRepository.save(category);
  }
}

export default UpdateCategoryService;