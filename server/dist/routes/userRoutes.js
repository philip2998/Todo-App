import express from 'express';
import { routeGuard } from '../middlewares/routeGuard.js';
import UserController from '../controllers/UserController.js';
import AuthController from '../controllers/AuthController.js';
import PasswordController from '../controllers/PasswordController.js';
const userRouter = express.Router();
const userController = new UserController();
const authController = new AuthController();
const passwordController = new PasswordController();
userRouter.use(routeGuard);
userRouter
    .route('/allusers')
    .get(authController.checkPermissions('admin'), userController.getAllUsers);
userRouter
    .route('/todos/main/:id')
    .post(authController.checkPermissions('admin'), userController.createUser);
userRouter.route('/todos/main/:id').get(userController.getUser);
userRouter
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .patch(passwordController.updatePassword)
    .delete(userController.deleteUser);
export default userRouter;
//# sourceMappingURL=UserRoutes.js.map