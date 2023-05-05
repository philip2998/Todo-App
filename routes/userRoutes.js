import express from 'express';
import UserController from '../controllers/UserController.js';
import AuthController from '../controllers/AuthController.js';

const userRouter = express.Router();

userRouter.post('/signup', AuthController.signup);
userRouter.post('/login', AuthController.login);

userRouter.patch('/updateMe', AuthController.protect, UserController.updateMe);
userRouter.delete('/deleteMe', AuthController.protect, UserController.deleteMe);

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
