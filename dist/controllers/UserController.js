var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import UserService from '../services/UserService.js';
import AppError from '../utils/exceptions/AppError.js';
import { catchAsync, sendSuccessResponse } from '../utils/helpers.js';
export default class UserController {
    constructor() {
        this.getAllUsers = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userService.getAllUsers();
            sendSuccessResponse(res, 200, users);
        }));
        this.getUser = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getUser(req.params.id);
            if (!user)
                return next(new AppError('No User found with that ID', 404, 'Fail'));
            sendSuccessResponse(res, 200, user);
        }));
        this.createUser = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const newUser = yield this.userService.createUser(req.body);
            sendSuccessResponse(res, 201, newUser);
        }));
        this.updateUser = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const updatedUser = yield this.userService.updateUser(req.params.id, req.body);
            if (!updatedUser)
                return next(new AppError('No User found with that ID', 404, 'Fail'));
            sendSuccessResponse(res, 200, updatedUser);
        }));
        this.deleteUser = catchAsync((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const deletedUser = yield this.userService.deleteUser(req.user.id, {
                active: false,
            });
            if (!deletedUser)
                return next(new AppError('No User found with tat ID', 404, 'Fail'));
            sendSuccessResponse(res, 200, deletedUser);
        }));
        this.userService = new UserService();
    }
}
//# sourceMappingURL=UserController.js.map