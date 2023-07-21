import express from 'express';
import PasswordController from '../controllers/PasswordController.js';
import AuthController from '../controllers/AuthController.js';
const authRouter = express.Router();
const authController = new AuthController();
const passwordController = new PasswordController();
authRouter.post('/signup', authController.signup);
authRouter.post('/login', authController.login);
authRouter.get('/logout', authController.logout);
authRouter.post('/login/forgotPassword', passwordController.forgotPassword);
authRouter.patch('/resetPassword/:token', passwordController.resetPassword);
export default authRouter;
//# sourceMappingURL=authRoutes.js.map