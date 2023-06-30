import express from 'express';
import { routeGuard } from '../middlewares/routeGuard.js';
import TodoController from '../controllers/TodoController.js';
const todoRouter = express.Router();
const todoController = new TodoController();
todoRouter.use(routeGuard);
todoRouter.route('/').get(todoController.getAllTodos);
todoRouter.route('/main/:id').get(todoController.getUserTodos);
todoRouter.route('/add').post(todoController.createTodo);
todoRouter.route('/edit/:id').patch(todoController.updateTodo);
todoRouter
    .route('/:id')
    .get(todoController.getTodo)
    .delete(todoController.deleteTodo);
export default todoRouter;
//# sourceMappingURL=TodoRoutes.js.map