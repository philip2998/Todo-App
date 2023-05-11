import Todo from '../models/userModel.js';

export default class TodoRepository {
  static async getAllData() {
    return await Todo.find();
  }

  static async getOneData(id) {
    return await Todo.findById(id);
  }

  static async createOneData(data) {
    const newDocument = await Todo.create(data);
  }

  static async updateOneData(id, data) {
    return await Todo.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  static async deleteOneData(id, active) {
    return await Todo.findByIdAndDelete(id, active);
  }
}
