var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
import { createSendToken } from '../utils/tokens.js';
import { catchAsync } from '../utils/helpers.js';
import UserService from '../services/UserService.js';
import AppError from '../utils/exceptions/AppError.js';
class AuthController {
    static logout(req, res) {
        res.cookie('jwt', 'loggedout', {
            expires: new Date(Date.now() + 10 * 1000),
            httpOnly: true,
        });
        res.status(200).json({ status: 'success' });
    }
    static checkPermissions(role) {
        return (req, res, next) => {
            if (!role.includes(req.user.role)) {
                return next(new AppError('You do not have permisson to perform this action', 403, 'Fail'));
            }
            next();
        };
    }
}
_a = AuthController;
AuthController.signup = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield UserService.createUser({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        role: req.body.role,
    });
    createSendToken(newUser, 201, res);
}));
AuthController.login = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password)
        return next(new AppError('Please provide email and password', 401, 'Fail'));
    const user = yield UserService.findOneUser({ email }, '+password');
    if (!user || !(yield user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401, 'Fail'));
    }
    createSendToken(user, 200, res);
}));
export default AuthController;
//# sourceMappingURL=AuthController.js.map