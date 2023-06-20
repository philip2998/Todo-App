import express from 'express';
import UserRoutes from './UserRoutes.js';
import TodoRouter from './TodoRoutes.js';
const routes = express.Router();
const todoRoutes = new TodoRouter();
routes.use('/todos', todoRoutes.router);
const userRoutes = new UserRoutes();
routes.use('/users', userRoutes.router);
export default routes;
//# sourceMappingURL=index.js.map