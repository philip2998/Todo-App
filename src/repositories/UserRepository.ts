import User from '../models/userModel.js';

export default class UserRepository {
  static async getAllData() {
    return await User.find();
  }

  static async getOneData(id: string) {
    return await User.findById(id);
  }

  static async createOneData(data: object) {
    const newDocument = await User.create(data);
    return newDocument;
  }

  static async updateOneData(id: string, data: object) {
    return await User.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  static async findOneData(query: object, select = '') {
    return User.findOne(query).select(select);
  }

  static async findDataById(id: string) {
    return await User.findById(id);
  }

  static async deleteOneData(id: string, active: object) {
    return await User.findByIdAndDelete(id, active);
  }
}
