import express, { Router } from 'express';
import { routeGuard } from '../middlewares/routeGuard.js';
import UserController from '../controllers/UserController.js';
import AuthController from '../controllers/AuthController.js';

const userRouter: Router = express.Router();
const userController = new UserController();
const authController = new AuthController();

// Routes with authentication
userRouter.use(routeGuard);

// Routes with admin permissions
userRouter
  .route('/allusers')
  .get(authController.checkPermissions('admin'), userController.getAllUsers)
  .post(authController.checkPermissions('admin'), userController.createUser);

userRouter
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

export default userRouter;
