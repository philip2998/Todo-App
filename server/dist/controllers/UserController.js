import { catchAsync, sendSuccessResponse } from '../utils/helpers.js';
import UserService from '../services/UserService.js';
import AppError from '../utils/exceptions/AppError.js';
export default class UserController {
    userService;
    constructor() {
        this.userService = new UserService();
    }
    getAllUsers = catchAsync(async (req, res) => {
        const users = await this.userService.getAllUsers();
        sendSuccessResponse(res, 200, users);
    });
    getUser = catchAsync(async (req, res, next) => {
        const user = await this.userService.getUser(req.params.id);
        if (!user)
            return next(new AppError("No User found with that ID!", 404));
        sendSuccessResponse(res, 200, user);
    });
    createUser = catchAsync(async (req, res) => {
        const newUser = await this.userService.createUser(req.body);
        sendSuccessResponse(res, 201, newUser);
    });
    updateUser = catchAsync(async (req, res, next) => {
        const updatedUser = await this.userService.updateUser(req.params.id, req.body);
        if (!updatedUser)
            return next(new AppError("No User found with that ID!", 404));
        sendSuccessResponse(res, 200, updatedUser);
    });
    deleteUser = catchAsync(async (req, res, next) => {
        const deletedUser = await this.userService.deleteUser(req.user.id, {
            active: false,
        });
        if (!deletedUser)
            return next(new AppError("No User found with that ID!", 404));
        sendSuccessResponse(res, 200, deletedUser);
    });
}
//# sourceMappingURL=UserController.js.map