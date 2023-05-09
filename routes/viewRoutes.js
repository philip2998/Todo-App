import express from 'express';
import ViewsController from '../controllers/ViewsController.js';

const viewRouter = express.Router();

viewRouter.get('/login', ViewsController.getLoginForm);

export default viewRouter;
