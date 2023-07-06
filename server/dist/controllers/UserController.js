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
        const pureUsers = users.filter(user => user.role !== 'admin');
        sendSuccessResponse(res, 200, pureUsers);
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
        const { id } = req.params;
        let deletedUser = null;
        if (req.user.role === 'admin') {
            deletedUser = await this.userService.deleteUser(id, { active: false });
        }
        else {
            deletedUser = await this.userService.deleteUser(req.user.id, {
                active: false,
            });
        }
        if (!deletedUser)
            return next(new AppError("No User found with that ID!", 404));
        sendSuccessResponse(res, 200, deletedUser);
    });
}
//# sourceMappingURL=UserController.js.map