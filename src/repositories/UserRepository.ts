import { IUserSchema } from '../interfaces/modelInterfaces.js';
import User from '../models/userModel.js';
import Repository from './Repository.js';

export default class UserRepository extends Repository<IUserSchema> {
  constructor() {
    super(User);
  }

  public async findOneData(query: object, select = '') {
    return this.model.findOne(query).select(select);
  }

  public async findDataById(id: string) {
    return await this.model.findById(id);
  }
}
