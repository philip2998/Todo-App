import express from 'express';
import { routeGuard } from '../middlewares/routeGuard.js';
import UserController from '../controllers/UserController.js';
import AuthController from '../controllers/AuthController.js';
const userRouter = express.Router();
const userController = new UserController();
const authController = new AuthController();
userRouter.use(routeGuard);
userRouter
    .route('/:id')
    .get(userController.getUser)
    .delete(userController.deleteUser);
userRouter.route('/edit/:id').patch(userController.updateUser);
userRouter.use(authController.checkPermissions('admin'));
userRouter
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser);
export default userRouter;
//# sourceMappingURL=UserRoutes.js.map