import express, { Router } from 'express';
import AuthController from '../controllers/AuthController.js';

const authRouter: Router = express.Router();
const authController = new AuthController();

// Routes without authentication
authRouter.post('/signup', authController.signup);
authRouter.post('/login', authController.login);
authRouter.get('/logout', authController.logout);

export default authRouter;
