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
import UserService from '../services/UserService.js';
import AppError from '../utils/exceptions/AppError.js';
import { catchAsync, sendSuccessResponse } from '../utils/helpers.js';
class UserController {
}
_a = UserController;
UserController.getAllUsers = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield UserService.getAllUsers();
    sendSuccessResponse(res, 200, users);
}));
UserController.getUser = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield UserService.getUser(req.params.id);
    if (!user)
        return next(new AppError('No User found with that ID', 404, 'Fail'));
    sendSuccessResponse(res, 200, user);
}));
UserController.createUser = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield UserService.createUser(req.body);
    sendSuccessResponse(res, 201, newUser);
}));
UserController.updateUser = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedUser = yield UserService.updateUser(req.params.id, req.body);
    if (!updatedUser)
        return next(new AppError('No User found with that ID', 404, 'Fail'));
    sendSuccessResponse(res, 200, updatedUser);
}));
UserController.deleteUser = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedUser = yield UserService.deleteUser(req.user.id, {
        active: false,
    });
    if (!deletedUser)
        return next(new AppError('No User found with tat ID', 404, 'Fail'));
    sendSuccessResponse(res, 200, deletedUser);
}));
export default UserController;
//# sourceMappingURL=UserController.js.map