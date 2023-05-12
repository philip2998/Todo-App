import User from '../models/userModel.js';

export default class UserRepository {
  static async getAllData() {
    return await User.find();
  }

  static async getOneData(id) {
    return await User.findById(id);
  }

  static async createOneData(data) {
    const newDocument = await User.create(data);
    return newDocument;
  }

  static async updateOneData(id, data) {
    return await User.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  static async findOneData(query, select = '') {
    return User.findOne(query).select(select);
  }

  static async findDataById(id) {
    return await User.findById(id);
  }

  static async deleteOneData(id, active) {
    return await User.findByIdAndDelete(id, active);
  }
}
