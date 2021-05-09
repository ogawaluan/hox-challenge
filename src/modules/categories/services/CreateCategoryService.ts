import { inject, injectable } from "tsyringe";

import Category from "../infra/typeorm/entities/Category";
import ICategoriesRepository from "../repositories/ICategoriesRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  name: string;
}

@injectable()
class CreateCategoryService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({ name }: IRequest): Promise<Category> {
    const checkCategoryExist = await this.categoriesRepository.findByName(name);

    if (checkCategoryExist) {
      throw new AppError('Category name already exist', 400);
    }

    const category = await this.categoriesRepository.create({
      name
    });

    return category;
  }
}

export default CreateCategoryService;