import { catchAsync } from '../utils/helpers.js';
import createToken from '../utils/JwtToken.js';
import UserService from '../services/UserService.js';
import AppError from '../utils/exceptions/AppError.js';
export default class AuthController {
    userService;
    constructor() {
        this.userService = new UserService();
    }
    signup = catchAsync(async (req, res) => {
        const newUser = await this.userService.createUser({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
            role: req.body.role,
        });
        createToken(newUser, 201, res);
    });
    login = catchAsync(async (req, res, next) => {
        const { email, password } = req.body;
        if (!email || !password)
            return next(new AppError("Please provide email and password", 400));
        const user = await this.userService.findOneUser({ email }, '+password');
        if (!user || !(await user.correctPassword(password, user.password))) {
            return next(new AppError("Incorrect email or password", 401));
        }
        createToken(user, 200, res);
    });
    logout(req, res) {
        res.cookie('jwt', 'loggedout', {
            expires: new Date(Date.now() + 10 * 1000),
            httpOnly: true,
        });
        res.status(200).json({ status: 'success' });
    }
    checkPermissions(role) {
        return (req, res, next) => {
            if (!role.includes(req.user.role)) {
                return next(new AppError("You do not have permisson to perform this action", 401));
            }
            next();
        };
    }
}
//# sourceMappingURL=AuthController.js.map