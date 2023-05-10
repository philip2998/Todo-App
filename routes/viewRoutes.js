import express from 'express';
import { getLoginForm } from '../controllers/getLoginForm.js';

const viewRouter = express.Router();

viewRouter.get('/login', getLoginForm);

export default viewRouter;
