import { Request, Response, NextFunction } from 'express';
import { catchAsync, sendSuccessResponse } from '../utils/helpers.js';
import { IUserSchema } from '../interfaces/modelInterfaces.js';
import { ErrorType } from '../utils/enums/index.js';

import multer from 'multer';
import errorHandler from '../middlewares/errorMiddleware.js';
import UserService from '../services/UserService.js';
import AppError from '../utils/exceptions/AppError.js';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

export default class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public getAllUsers = catchAsync(async (req: Request, res: Response) => {
    const users: IUserSchema[] = await this.userService.getAllUsers();
    const pureUsers = users.filter(user => user.role !== 'admin');
    sendSuccessResponse(res, 200, pureUsers);
  });

  public getUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const user: IUserSchema | null = await this.userService.getUser(
        req.params.id
      );

      if (!user)
        return next(
          new AppError(ErrorType.USER_NOT_FOUND, ErrorType.NOT_FOUND)
        );

      sendSuccessResponse(res, 200, user);
    }
  );

  public createUser = catchAsync(async (req: Request, res: Response) => {
    const newUser: IUserSchema = await this.userService.createUser(req.body);
    sendSuccessResponse(res, 201, newUser);
  });

  public updateUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const updatedUser: IUserSchema | null = await this.userService.updateUser(
        req.params.id,
        req.body
      );

      if (!updatedUser)
        return next(
          new AppError(ErrorType.USER_NOT_FOUND, ErrorType.NOT_FOUND)
        );

      sendSuccessResponse(res, 200, updatedUser);
    }
  );

  public deleteUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      let deletedUser: IUserSchema | null = null;

      if (req.user.role === 'admin') {
        deletedUser = await this.userService.deleteUser(id, { active: false });
      } else {
        deletedUser = await this.userService.deleteUser(req.user.id, {
          active: false,
        });
      }

      if (!deletedUser)
        return next(
          new AppError(ErrorType.USER_NOT_FOUND, ErrorType.NOT_FOUND)
        );

      sendSuccessResponse(res, 200, deletedUser);
    }
  );

  public uploadUserPhoto = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const multerStorage = multer.diskStorage({
        destination: (
          req,
          file: Express.Multer.File,
          cb: DestinationCallback
        ) => {
          cb(null, 'public/img/users');
        },
        filename: (req, file: Express.Multer.File, cb: FileNameCallback) => {
          const extension = file.mimetype.split('/')[1];
          cb(null, `user-${req.user.id}-${Date.now()}.${extension}`);
        },
      });

      const multerFilter = (
        req: Request,
        file: Express.Multer.File,
        cb: any
      ) => {
        if (file.mimetype.startsWith('image')) {
          next(cb(null, true));
        } else {
          next(
            cb(
              errorHandler(
                new AppError('Not an image! Please upload only images', 400),
                req,
                res,
                next
              )
            )
          );
        }
      };

      const upload = multer({
        storage: multerStorage,
        fileFilter: multerFilter,
      });
      upload.single('photo');
    }
  );
}
