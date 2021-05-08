import { Router } from 'express';

import CategoriesController from './controllers/CategoriesController';

const categoriesRouter = Router();
const categoriesController = new CategoriesController();

categoriesRouter.post('/', categoriesController.create);
categoriesRouter.get('/', categoriesController.index);
categoriesRouter.get('/:category_id', categoriesController.show);
categoriesRouter.put('/', categoriesController.update);
categoriesRouter.delete('/:category_id', categoriesController.delete);

export default categoriesRouter;