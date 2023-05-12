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

userRouter.patch('/updateMe', UserController.updateMe);
userRouter.delete('/deleteMe', UserController.deleteMe);

// Protect all routes that it comes after this middleware
userRouter.use(AuthController.checkPermissions('admin'));

userRouter
  .route('/')
  .get(UserController.getAllUsers)
  .post(UserController.createUser);
userRouter
  .route('/:id')
  .get(UserController.getUser)
  .patch(UserController.updateUser)
  .delete(UserController.deleteUser);

export default userRouter;
