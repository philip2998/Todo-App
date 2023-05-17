var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { catchAsync } from '../utils/helpers.js';
import jwt from 'jsonwebtoken';
import UserService from '../services/UserService.js';
import AppError from '../utils/exceptions/AppError.js';
export default class ProtectRoutes {
    constructor() {
        this.routeGuard = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let token;
            if (req.cookies.jwt) {
                token = req.cookies.jwt;
            }
            else if (req.headers.authorization &&
                req.headers.authorization.startsWith('Bearer')) {
                token = req.headers.authorization.split(' ')[1];
            }
            if (!token) {
                return next(new AppError('You are not logged in. Please log in!', 401, 'Fail'));
            }
            try {
                const decoded = yield this.verifyToken(token, process.env.JWT_SECRET);
                const currentUser = yield this.userService.findUserById(decoded.id);
                if (!currentUser) {
                    return next(new AppError('The user belonging to this token does no longer exist', 401, 'Fail'));
                }
                req.user = currentUser;
                res.locals.user = currentUser;
                next();
            }
            catch (error) {
                return next(new AppError('Invalid token', 401, 'Fail'));
            }
        }));
        this.userService = new UserService();
    }
    verifyToken(token, secret) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, secret, (err, decoded) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(decoded);
                }
            });
        });
    }
}
//# sourceMappingURL=ProtectRoutes.js.map