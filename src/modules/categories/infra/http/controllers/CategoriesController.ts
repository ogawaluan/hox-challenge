import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateCategoryService from "@modules/categories/services/CreateCategoryService";
import UpdateCategoryService from "@modules/categories/services/UpdateCategoryService";
import DeleteCategoryService from "@modules/categories/services/DeleteCategoryService";
import ShowCategoryService from "@modules/categories/services/ShowCategoryService";
import ListAllCategoriesService from "@modules/categories/services/ListAllCategories";

class CategoriesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createCategory = container.resolve(CreateCategoryService)

    const category = await createCategory.execute({
      name
    });

    return response.json(category);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { category_id, name } = request.body;

    const updateCategory = container.resolve(UpdateCategoryService);

    const category = await updateCategory.execute({
      category_id,
      name,
    });

    return response.json(category);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { category_id } = request.params;

    const deleteCategory = container.resolve(DeleteCategoryService);

    await deleteCategory.execute({
      category_id,
    });

    return response.json({ message: 'Category deleted!' });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { category_id } = request.params;
  
    const showCategory = container.resolve(ShowCategoryService);
  
    const category = await showCategory.execute({
      category_id,
    });
  
    return response.json(category);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { sortField, sortOrder, page } = request.query;

    const listAllCategories = container.resolve(ListAllCategoriesService);

    const categories = await listAllCategories.execute({
      page: Number(page),
      sortField,
      sortOrder,
    });

    return response.json({page, categories});
  }
}

export default CategoriesController;