import express from 'express';
import TodoController from '../controllers/TodoController.js';
import ProtectRoutes from '../controllers/ProtectRoutes.js';
import AuthController from '../controllers/AuthController.js';
const todoRouter = express.Router();
const todoController = new TodoController();
const authController = new AuthController();
const protectRoutes = new ProtectRoutes();
todoRouter.use(protectRoutes.routeGuard);
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
//# sourceMappingURL=todoRoutes.js.map