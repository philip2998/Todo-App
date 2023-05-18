import express, { Router } from 'express';
import TodoController from '../controllers/TodoController.js';
import ProtectRoutes from '../controllers/ProtectRoutes.js';
import AuthController from '../controllers/AuthController.js';

export default class TodoRouter {
  public router: Router;
  private todoController: TodoController;
  private authController: AuthController;
  private protectRoutes: ProtectRoutes;

  constructor() {
    this.router = express.Router();
    this.todoController = new TodoController();
    this.authController = new AuthController();
    this.protectRoutes = new ProtectRoutes();

    this.initalizeRoutes();
  }

  private initalizeRoutes(): void {
    this.router.use(this.protectRoutes.routeGuard);

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
