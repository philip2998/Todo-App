import Todo from '../models/todoModel.js';

export default class TodoRepository {
  static async getAllData() {
    return await Todo.find();
  }

  static async getOneData(id: string) {
    return await Todo.findById(id);
  }

  static async createOneData(data: object) {
    const newDocument = await Todo.create(data);
    return newDocument;
  }

  static async updateOneData(id: string, data: object) {
    return await Todo.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  static async deleteOneData(id: string) {
    return await Todo.findByIdAndDelete(id);
  }
}
