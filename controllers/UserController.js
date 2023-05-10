import { getOne, getAll, deleteOne, updateOne } from './handlerFactory.js';
import { deleteMe } from './deleteMe.js';
import { updateMe } from './updateMe.js';

export default class UserController {
  static getAllUsers = getAll(User);
  static getUser = getOne(User);
  static updateUser = updateOne(User);
  static deleteUser = deleteOne(User);
}
