import { catchAsync } from '../utils/helpers.js';
import { verifyJwtToken } from './verifyJwtToken.js';
import UserService from '../services/UserService.js';
import AppError from '../utils/exceptions/AppError.js';
export const routeGuard = catchAsync(async (req, res, next) => {
    const userService = new UserService();
    let token;
    if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    else if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return next(new AppError("You are not logged in. Please log in!", 401));
    }
    try {
        const decoded = await verifyJwtToken(token, process.env.JWT_SECRET);
        const currentUser = await userService.findUserById(decoded.id);
        if (!currentUser) {
            return next(new AppError("The user belonging to this token does no longer exist!", 401));
        }
        req.user = currentUser;
        res.locals.user = currentUser;
        next();
    }
    catch (error) {
        return next(new AppError("This is invalid token!", 401));
    }
});
//# sourceMappingURL=routeGuard.js.map