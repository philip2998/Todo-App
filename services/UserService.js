import UserRepository from '../repositories/UserRepository.js';

export default class UserService {
  static async getAllUsers() {
    return await UserRepository.getAllData();
  }

  static async getUser(id) {
    return await UserRepository.getOneData(id);
  }

  static async createUser(data) {
    return await UserRepository.createOneData(data);
  }

  static async updateUser(id, data) {
    return await UserRepository.updateOneData(id, data);
  }

  static async findOneUser(query, select = '') {
    return UserRepository.findOneData(query, select);
  }

  static async deleteUser(id, active) {
    return await UserRepository.deleteOneData(id, data);
  }
}
