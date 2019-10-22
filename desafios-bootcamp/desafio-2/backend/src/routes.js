import { Router } from 'express';
import AdminSessionController from './app/controllers/AdminSessionController';
import StudentController from './app/controllers/StudentController';

import AuthMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', AdminSessionController.store);

routes.use(AuthMiddleware);

routes.post('/students', StudentController.store);

export default routes;
