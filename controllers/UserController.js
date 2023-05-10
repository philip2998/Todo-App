import User from '../models/userModel.js';
import { getOne, getAll, deleteOne, updateOne } from './handlerFactory.js';
import { deleteMe } from './deleteMe.js';
import { updateMe } from './updateMe.js';

export default class UserController {
  static updateMe = updateMe(User);

  static deleteMe = deleteMe(User);

  static getAllUsers = getAll(User);

  static getUser = getOne(User);

  static updateUser = updateOne(User);

  static deleteUser = deleteOne(User);
}
