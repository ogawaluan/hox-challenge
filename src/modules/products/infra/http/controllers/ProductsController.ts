import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateProductService from "@modules/products/services/CreateProductService";
import UpdateProductService from "@modules/products/services/UpdateProductService";
import ListAllProductsService from "@modules/products/services/ListAllProductsService";
import ShowProductService from "@modules/products/services/ShowProductService";
import DeleteProductService from "@modules/products/services/DeleteProductService";

class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { 
      category_id,
      name,
      manufacturingDate,
      perishableProduct,
      expirationDate,
      price,
    } = request.body;

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({
      category_id,
      name,
      manufacturingDate,
      perishableProduct,
      expirationDate,
      price,
    });

    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { 
      product_id,
      name,
      manufacturingDate,
      perishableProduct,
      expirationDate,
      price,
    } = request.body;

    const updateProduct = container.resolve(UpdateProductService);

    const product = await updateProduct.execute({
      product_id,
      name,
      manufacturingDate,
      perishableProduct,
      expirationDate,
      price,
    });

    return response.json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { product_id } = request.params;

    const deleteCategory = container.resolve(DeleteProductService);

    await deleteCategory.execute({
      product_id,
    });

    return response.json({ message: 'Product deleted!' });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { product_id } = request.params;

    const showProduct = container.resolve(ShowProductService);

    const product = await showProduct.execute({
      product_id,
    });

    return response.json(product);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { sortField, sortOrder, page, category_id } = request.query;

    const listAllProducts = container.resolve(ListAllProductsService);

    const products = await listAllProducts.execute({
      page: Number(page),
      category_id: category_id ? String(category_id) : undefined,
      sortField,
      sortOrder,
    });

    return response.json({page, products});
  }
}

export default ProductsController;