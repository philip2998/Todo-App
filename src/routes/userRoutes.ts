import express, { Router } from 'express';
import UserController from '../controllers/UserController.js';
import ProtectRoutes from '../controllers/ProtectRoutes.js';
import AuthController from '../controllers/AuthController.js';

export default class UserRoutes {
  public router: Router;
  private userController: UserController;
  private authController: AuthController;
  private protectRoutes: ProtectRoutes;

  constructor() {
    this.router = express.Router();
    this.userController = new UserController();
    this.authController = new AuthController();
    this.protectRoutes = new ProtectRoutes();

    this.initalizeRoutes();
  }

  private initalizeRoutes(): void {
    this.router.post('/signup', this.authController.signup);
    this.router.post('/login', this.authController.login);
    this.router.get('/logout', this.authController.logout);

    // Protect all routes that comes after this middleware
    this.router.use(this.protectRoutes.routeGuard);

    this.router
      .route('/:id')
      .patch(this.userController.updateUser)
      .delete(this.userController.deleteUser);

    // Protect all routes that comes after this middleware
    this.router.use(this.authController.checkPermissions('admin'));

    this.router
      .route('/')
      .get(this.userController.getAllUsers)
      .post(this.userController.createUser);
    this.router.route('/:id').get(this.userController.getUser);
  }
}
