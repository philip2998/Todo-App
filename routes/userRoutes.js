import express from 'express';
import UserController from '../controllers/UserController.js';
import protectRoutes from '../controllers/protectRoutes.js';
import AuthController from '../controllers/AuthController.js';

const userRouter = express.Router();

userRouter.post('/signup', AuthController.signup);
userRouter.post('/login', AuthController.login);
userRouter.get('/logout', AuthController.logout);

// Protect all routes that it comes after this middleware
userRouter.use(protectRoutes);

userRouter
  .route('/:id')
  .patch(UserController.updateUser)
  .delete(UserController.deleteUser);

// Protect all routes that it comes after this middleware
userRouter.use(AuthController.checkPermissions('admin'));

userRouter
  .route('/')
  .get(UserController.getAllUsers)
  .post(UserController.createUser);
userRouter.route('/:id').get(UserController.getUser);

export default userRouter;
