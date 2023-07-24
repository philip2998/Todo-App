import { ITodoSchema } from '../interfaces/modelInterfaces.js';

import Repository from './Repository.js';
import Todo from '../models/todoModel.js';

export default class TodoRepository extends Repository<ITodoSchema> {
  constructor() {
    super(Todo);
  }

  public async findOneData(query: object, select = '') {
    return this.model.findOne(query).select(select);
  }
}
