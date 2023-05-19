import express from 'express';
import { routeGuard } from '../middlewares/routeGuard.js';
import UserController from '../controllers/UserController.js';
import AuthController from '../controllers/AuthController.js';
export default class UserRoutes {
    router;
    userController;
    authController;
    constructor() {
        this.router = express.Router();
        this.userController = new UserController();
        this.authController = new AuthController();
        this.initalizeRoutes();
    }
    initalizeRoutes() {
        this.router.post('/signup', this.authController.signup);
        this.router.post('/login', this.authController.login);
        this.router.get('/logout', this.authController.logout);
        this.router.use(routeGuard);
        this.router
            .route('/:id')
            .patch(this.userController.updateUser)
            .delete(this.userController.deleteUser);
        this.router.use(this.authController.checkPermissions('admin'));
        this.router
            .route('/')
            .get(this.userController.getAllUsers)
            .post(this.userController.createUser);
        this.router.route('/:id').get(this.userController.getUser);
    }
}
//# sourceMappingURL=UserRoutes.js.map