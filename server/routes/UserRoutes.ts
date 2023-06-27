import express, { Router } from 'express';
import { routeGuard } from '../middlewares/routeGuard.js';
import UserController from '../controllers/UserController.js';
import AuthController from '../controllers/AuthController.js';

const userRouter: Router = express.Router();
const userController = new UserController();
const authController = new AuthController();

// Routes without authentication
userRouter.post('/signup', authController.signup);
userRouter.post('/login', authController.login);
userRouter.get('/logout', authController.logout);

// Routes with authentication
userRouter.use(routeGuard);

userRouter
  .route('/:id')
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

// Routes with admin permissions
userRouter.use(authController.checkPermissions('admin'));

userRouter
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);
userRouter.route('/:id').get(userController.getUser);

export default userRouter;
