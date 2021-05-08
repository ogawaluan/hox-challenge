import { container } from 'tsyringe';

import '@modules/users/providers/index';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import CategoriesRepository from '@modules/categories/infra/typeorm/repositories/CategoriesRepository';
import ICategoriesRepository from '@modules/categories/repositories/ICategoriesRepository';

import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository', 
  UsersRepository,
);

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository', 
  CategoriesRepository,
);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository', 
  ProductsRepository,
);