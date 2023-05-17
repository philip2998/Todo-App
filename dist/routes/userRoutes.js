import express from 'express';
import UserController from '../controllers/UserController.js';
import ProtectRoutes from '../controllers/ProtectRoutes.js';
import AuthController from '../controllers/AuthController.js';
const userRouter = express.Router();
const userController = new UserController();
const authController = new AuthController();
const protectRoutes = new ProtectRoutes();
userRouter.post('/signup', authController.signup);
userRouter.post('/login', authController.login);
userRouter.get('/logout', authController.logout);
userRouter.use(protectRoutes.routeGuard);
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
//# sourceMappingURL=userRoutes.js.map