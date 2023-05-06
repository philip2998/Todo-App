import express from 'express';
import UserController from '../controllers/UserController.js';
import signup from '../middlewares/signup.js';
import login from '../middlewares/login.js';
import protect from '../middlewares/protect.js';

const userRouter = express.Router();

userRouter.post('/signup', signup);
userRouter.post('/login', login);

userRouter.patch('/updateMe', protect, UserController.updateMe);
userRouter.delete('/deleteMe', protect, UserController.deleteMe);

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
