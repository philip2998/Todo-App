import User from '../models/userModel.js';

export default class UserRepository {
  public async getAllData() {
    return await User.find();
  }

  public async getOneData(id: string) {
    return await User.findById(id);
  }

  public async createOneData(data: object) {
    const newDocument = await User.create(data);
    return newDocument;
  }

  public async updateOneData(id: string, data: object) {
    return await User.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  public async findOneData(query: object, select = '') {
    return User.findOne(query).select(select);
  }

  public async findDataById(id: string) {
    return await User.findById(id);
  }

  public async deleteOneData(id: string, active: object) {
    return await User.findByIdAndDelete(id, active);
  }
}
