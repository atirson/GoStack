import { Router } from 'express';
import AdminSessionController from './app/controllers/AdminSessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';

import AuthMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', AdminSessionController.store);

routes.use(AuthMiddleware);

routes.post('/students', StudentController.store);

routes.post('/plans', PlanController.store);
routes.get('/plans', PlanController.index);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

export default routes;
