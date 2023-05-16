import UserRepository from '../repositories/UserRepository.js';

export default class UserService {
  static async getAllUsers() {
    return await UserRepository.getAllData();
  }

  static async getUser(id: string) {
    return await UserRepository.getOneData(id);
  }

  static async createUser(data: object) {
    return await UserRepository.createOneData(data);
  }

  static async updateUser(id: string, data: object) {
    return await UserRepository.updateOneData(id, data);
  }

  static async findOneUser(query: object, select = '') {
    return UserRepository.findOneData(query, select);
  }

  static async findUserById(id: string) {
    return await UserRepository.findDataById(id);
  }

  static async deleteUser(id: string, active: object) {
    return await UserRepository.deleteOneData(id, active);
  }
}
