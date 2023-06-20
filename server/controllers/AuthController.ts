import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/helpers.js';
import { ErrorType } from '../utils/enums/index.js';
import createToken from '../utils/JwtToken.js';
import UserService from '../services/UserService.js';
import AppError from '../utils/exceptions/AppError.js';

export default class AuthController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public signup = catchAsync(async (req: Request, res: Response) => {
    const newUser = await this.userService.createUser({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      role: req.body.role,
    });
    createToken(newUser, 201, res);
  });

  public login = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email, password } = req.body;

      if (!email || !password)
        return next(
          new AppError(ErrorType.NO_EMAIL_AND_PASSWORD, ErrorType.BAD_REQUEST)
        );

      const user = await this.userService.findOneUser({ email }, '+password');

      if (!user || !(await user.correctPassword(password, user.password))) {
        return next(
          new AppError(
            ErrorType.INCORRECT_EMAIL_OR_PASSWORD,
            ErrorType.UNAUTHORIZED
          )
        );
      }
      createToken(user, 200, res);
    }
  );

  public logout(req: Request, res: Response): void {
    res.cookie('jwt', 'loggedout', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
    });
    res.status(200).json({ status: 'success' });
  }

  public checkPermissions(role: string) {
    return (req: Request, res: Response, next: NextFunction) => {
      if (!role.includes(req.user.role)) {
        return next(
          new AppError(ErrorType.UNAUTHORIZED_ACCESS, ErrorType.UNAUTHORIZED)
        );
      }
      next();
    };
  }
}
