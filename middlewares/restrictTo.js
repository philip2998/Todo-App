import AppError from '../utils/AppError.js';

const restrictTo = role => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return next(
        new AppError('You do not have permisson to perform this action', 403)
      );
    }
    next();
  };
};

export default restrictTo;
