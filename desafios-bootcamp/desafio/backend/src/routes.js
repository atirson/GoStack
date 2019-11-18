import { Router } from 'express';
import AdminSessionController from './app/controllers/AdminSessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import EnrollmentController from './app/controllers/EnrollmentController';
import CheckInController from './app/controllers/CheckInController';
import HelpOrderController from './app/controllers/HelpOrderController';
import AnswerController from './app/controllers/AnswerController';

import AuthMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', AdminSessionController.store);

routes.post('/checkins', CheckInController.store);
routes.get('/checkins', CheckInController.index);

routes.post('/:id/help-orders', HelpOrderController.store);
routes.get('/:id/help-orders', HelpOrderController.index);

routes.use(AuthMiddleware);

routes.post('/students', StudentController.store);

routes.post('/plans', PlanController.store);
routes.get('/plans', PlanController.index);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

routes.get('/enrollments', EnrollmentController.index);
routes.post('/enrollments', EnrollmentController.store);
routes.put('/enrollments', EnrollmentController.update);
routes.delete('/enrollments/:id', EnrollmentController.delete);

routes.post('/help-orders/:id/answer', AnswerController.store);

export default routes;
