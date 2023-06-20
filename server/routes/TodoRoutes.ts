import express, { Router } from 'express';
import { routeGuard } from '../middlewares/routeGuard.js';
import TodoController from '../controllers/TodoController.js';
import AuthController from '../controllers/AuthController.js';

export default class TodoRouter {
  public router: Router;
  private todoController: TodoController;
  private authController: AuthController;

  constructor() {
    this.router = express.Router();
    this.todoController = new TodoController();
    this.authController = new AuthController();

    this.initalizeRoutes();
  }

  private initalizeRoutes(): void {
    this.router.use(routeGuard);

    this.router
      .route('/')
      .get(this.todoController.getAllTodos)
      .post(this.todoController.createTodo);

    this.router
      .route('/:id')
      .get(this.todoController.getTodo)
      .patch(this.todoController.updateTodo)
      .delete(
        this.authController.checkPermissions('admin'),
        this.todoController.deleteTodo
      );
  }
}
