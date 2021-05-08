import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import categoriesRouter from '@modules/categories/infra/http/categories.routes';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import productsRouter from '@modules/products/infra/http/products.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/categories', ensureAuthenticated, categoriesRouter);
routes.use('/products', ensureAuthenticated, productsRouter);

export default routes;