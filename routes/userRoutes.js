import express from 'express';
import UserController from '../controllers/UserController.js';
import signup from '../controllers/signup.js';
import login from '../controllers/login.js';
import protect from '../controllers/protect.js';
import checkPermissions from '../middlewares/checkPermissions.js';

const userRouter = express.Router();

userRouter.post('/signup', signup);
userRouter.post('/login', login);

// Protect all routes that it comes after this middleware
route.use(protect);

userRouter.patch('/updateMe', protect, UserController.updateMe);
userRouter.delete('/deleteMe', protect, UserController.deleteMe);

// Protect all routes that it comes after this middleware
route.use(checkPermissions('admin'));

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
