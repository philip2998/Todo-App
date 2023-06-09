import express from 'express';
import { routeGuard } from '../middlewares/routeGuard.js';
import TodoController from '../controllers/TodoController.js';
import AuthController from '../controllers/AuthController.js';
const todoRouter = express.Router();
const todoController = new TodoController();
const authController = new AuthController();
todoRouter.use(routeGuard);
todoRouter
    .route('/alltodos')
    .get(authController.checkPermissions('admin'), todoController.getAllTodos);
todoRouter
    .route('/main/:id')
    .get(todoController.getUserTodos)
    .post(todoController.createTodo);
todoRouter
    .route('/main/:id/:id')
    .get(todoController.getTodo)
    .patch(todoController.updateTodo)
    .delete(todoController.deleteTodo);
export default todoRouter;
//# sourceMappingURL=TodoRoutes.js.map