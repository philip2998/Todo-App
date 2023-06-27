import express from 'express';
import { routeGuard } from '../middlewares/routeGuard.js';
import UserController from '../controllers/UserController.js';
import AuthController from '../controllers/AuthController.js';
const userRouter = express.Router();
const userController = new UserController();
const authController = new AuthController();
userRouter.post('/signup', authController.signup);
userRouter.post('/login', authController.login);
userRouter.get('/logout', authController.logout);
userRouter.use(routeGuard);
userRouter
    .route('/:id')
    .patch(userController.updateUser)
    .delete(userController.deleteUser);
userRouter.use(authController.checkPermissions('admin'));
userRouter
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser);
userRouter.route('/:id').get(userController.getUser);
export default userRouter;
//# sourceMappingURL=UserRoutes.js.map