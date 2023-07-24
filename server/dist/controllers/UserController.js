import { catchAsync, sendSuccessResponse } from '../utils/helpers.js';
import multer from 'multer';
import errorHandler from '../middlewares/errorMiddleware.js';
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
    uploadUserPhoto = catchAsync(async (req, res, next) => {
        const multerStorage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'public/img/users');
            },
            filename: (req, file, cb) => {
                const extension = file.mimetype.split('/')[1];
                cb(null, `user-${req.user.id}-${Date.now()}.${extension}`);
            },
        });
        const multerFilter = (req, file, cb) => {
            if (file.mimetype.startsWith('image')) {
                next(cb(null, true));
            }
            else {
                next(cb(errorHandler(new AppError('Not an image! Please upload only images', 400), req, res, next)));
            }
        };
        const upload = multer({
            storage: multerStorage,
            fileFilter: multerFilter,
        });
        upload.single('photo');
    });
}
//# sourceMappingURL=UserController.js.map