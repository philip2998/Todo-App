import Todo from '../models/todoModel.js';

export default class TodoRepository {
  public async getAllData() {
    return await Todo.find();
  }

  public async getOneData(id: string) {
    return await Todo.findById(id);
  }

  public async createOneData(data: object) {
    const newDocument = await Todo.create(data);
    return newDocument;
  }

  public async updateOneData(id: string, data: object) {
    return await Todo.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  public async deleteOneData(id: string) {
    return await Todo.findByIdAndDelete(id);
  }
}
