import express from 'express';
import { routeGuard } from '../middlewares/routeGuard.js';
import TodoController from '../controllers/TodoController.js';
import AuthController from '../controllers/AuthController.js';
const todoRouter = express.Router();
const todoController = new TodoController();
const authController = new AuthController();
todoRouter.use(routeGuard);
todoRouter
    .route('/')
    .get(todoController.getAllTodos)
    .post(todoController.createTodo);
todoRouter
    .route('/:id')
    .get(todoController.getTodo)
    .patch(todoController.updateTodo)
    .delete(authController.checkPermissions('admin'), todoController.deleteTodo);
export default todoRouter;
//# sourceMappingURL=TodoRoutes.js.map