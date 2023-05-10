import express from 'express';
import { getLoginForm } from '../controllers/getLoginForm.js';

const viewRouter = express.Router();

viewRouter.get('/', (req, res) => res.send('Hello For me'));
viewRouter.get('/login', getLoginForm);

export default viewRouter;
