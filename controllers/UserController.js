import User from '../models/userModel.js';
<<<<<<< HEAD
import { getOne, getAll, deleteOne, updateOne } from './handlerFactory.js';
import { deleteMe } from './deleteMe.js';
import { updateMe } from './updateMe.js';
=======
import catchAsync from '../utils/catchAsync.js';
import filterBody from '../utils/filterBody.js';
import sendSuccessResponse from '../utils/sendSuccessResponse.js';
import { getOne, getAll, deleteOne, updateOne } from './handlerFactory.js';
>>>>>>> 580df084f672a89bf497f4c0fcc31fb69e0e574a

export default class UserController {
  static updateMe = updateMe(User);

  static deleteMe = deleteMe(User);

  static getAllUsers = getAll(User);

  static getUser = getOne(User);

  static updateUser = updateOne(User);

  static deleteUser = deleteOne(User);
}
