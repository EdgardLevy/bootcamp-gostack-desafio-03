// const { Router } = require('express');
import Router from 'express';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import SubscriptionController from './app/controllers/SubscriptionController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

// global usage of authMiddleware
routes.use(authMiddleware); // after this, all others routes above will be protected

routes.post('/students', StudentController.store);
routes.get('/students', StudentController.index);
routes.get('/students/:id', StudentController.show);
routes.put('/students/:id', StudentController.update);
routes.delete('/students/:id', StudentController.delete);

routes.post('/plans', PlanController.store);
routes.get('/plans', PlanController.index);
routes.get('/plans/:id', PlanController.show);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

routes.post('/subscriptions', SubscriptionController.store);
routes.get('/subscriptions', SubscriptionController.index);
routes.get('/subscriptions/:id', SubscriptionController.show);
routes.put('/subscriptions/:id', SubscriptionController.update);
routes.delete('/subscriptions/:id', SubscriptionController.delete);

// module.exports = routes;
export default routes;
