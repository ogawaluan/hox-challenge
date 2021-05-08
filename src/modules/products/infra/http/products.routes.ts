import { Router } from 'express';
import ProductsController from './controllers/ProductsController';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.post('/', productsController.create);
productsRouter.put('/', productsController.update);
productsRouter.delete('/:product_id', productsController.delete);
productsRouter.get('/:product_id', productsController.show);
productsRouter.get('/', productsController.index);

export default productsRouter;