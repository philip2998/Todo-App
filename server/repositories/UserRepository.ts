import { IUserSchema } from '../interfaces/modelInterfaces.js';

import Repository from './Repository.js';
import User from '../models/userModel.js';

export default class UserRepository extends Repository<IUserSchema> {
  constructor() {
    super(User);
  }

  public async findOneData(query: object, select = '') {
    return this.model.findOne(query).select(select);
  }

  public async findDataById(id: string): Promise<IUserSchema | null> {
    return await this.model.findById(id).select('+password');
  }
}
