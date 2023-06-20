import UserRepository from '../repositories/UserRepository.js';

export default class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }
  public async getAllUsers() {
    return await this.userRepository.getAllData();
  }

  public async getUser(id: string) {
    return await this.userRepository.getOneData(id);
  }

  public async createUser(data: object) {
    return await this.userRepository.createOneData(data);
  }

  public async updateUser(id: string, data: object) {
    return await this.userRepository.updateOneData(id, data);
  }

  public async findOneUser(query: object, select = '') {
    return this.userRepository.findOneData(query, select);
  }

  public async findUserById(id: string) {
    return await this.userRepository.findDataById(id);
  }

  public async deleteUser(id: string, active: object) {
    return await this.userRepository.deleteOneData(id, active);
  }
}
