import { inject, injectable } from "tsyringe";

import Category from "../infra/typeorm/entities/Category";
import ICategoriesRepository from "../repositories/ICategoriesRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  category_id: string;
}

@injectable()
class DeleteCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({ category_id }: IRequest): Promise<Category> {
    const category = await this.categoriesRepository.findById(category_id);

    if (!category) {
      throw new AppError('Category not found', 404);
    }

    await this.categoriesRepository.delete(category.id);

    return category;
  }
}

export default DeleteCategoryService;