import { Request, Response, NextFunction } from 'express';
import JwtToken from '../utils/JwtToken.js';
import { catchAsync } from '../utils/helpers.js';
import UserService from '../services/UserService.js';
import AppError from '../utils/exceptions/AppError.js';

export default class AuthController {
  private userService: UserService;
  private jwtToken: JwtToken;

  constructor() {
    this.userService = new UserService();
    this.jwtToken = new JwtToken();
  }

  public signup = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const newUser = await this.userService.createUser({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        role: req.body.role,
      });
      this.jwtToken.createSendStoken(newUser, 201, res);
    }
  );

  public login = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const { email, password } = req.body;

      if (!email || !password)
        return next(
          new AppError('Please provide email and password', 401, 'Fail')
        );

      const user = await this.userService.findOneUser({ email }, '+password');

      if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401, 'Fail'));
      }
      this.jwtToken.createSendStoken(user, 200, res);
    }
  );

  public logout(req: Request, res: Response) {
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
          new AppError(
            'You do not have permisson to perform this action',
            403,
            'Fail'
          )
        );
      }
      next();
    };
  }
}
