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
const verifyToken = (token, secret) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (error, decoded) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(decoded);
            }
        });
    });
};
const protectRoutes = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const decoded = yield verifyToken(token, process.env.JWT_SECRET);
        const currentUser = yield UserService.findUserById(decoded.id);
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
export default protectRoutes;
//# sourceMappingURL=protectRoutes.js.map