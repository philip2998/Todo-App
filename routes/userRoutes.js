import express from 'express';
import UserController from '../controllers/UserController.js';
import signup from '../controllers/signup.js';
import login from '../controllers/login.js';
import protect from '../controllers/protect.js';
import checkPermissions from '../middlewares/checkPermissions.js';
import logout from '../controllers/logout.js';

const userRouter = express.Router();

userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.get('/logout', logout);

// Protect all routes that it comes after this middleware
userRouter.use(protect);

userRouter.patch('/updateMe', protect, UserController.updateMe);
userRouter.delete('/deleteMe', protect, UserController.deleteMe);

// Protect all routes that it comes after this middleware
userRouter.use(checkPermissions('admin'));

userRouter.route('/').get(UserController.getAllUsers);
userRouter
  .route('/:id')
  .get(UserController.getUser)
  .patch(UserController.updateUser)
  .delete(UserController.deleteUser);

export default userRouter;
