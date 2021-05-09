import { inject, injectable } from "tsyringe";

import Category from "../infra/typeorm/entities/Category";
import ICategoriesRepository from "../repositories/ICategoriesRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  page: number;
  sortField: any;
  sortOrder: any;
}

@injectable()
class ListAllCategoriesService {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  public async execute({ page, sortField, sortOrder }: IRequest): Promise<Category[]> {
    let limit;

    if (!limit) {
      limit = 10;
    }

    if (page) {
      limit = 10;
    }

    let offset = (page * 10) - 10;

    if (offset < 0) {
      offset = 0
    }

    const categories = await this.categoriesRepository.findAllCategories(
      sortField,
      sortOrder,
      limit,
      offset,
    );

    if (!categories) {
      throw new AppError('Categories not found', 404);
    }

    if (categories.length === 0) {
      throw new AppError('You have no registered categories', 400);
    }

    return categories;
  }
}

export default ListAllCategoriesService;