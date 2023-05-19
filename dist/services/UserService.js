import UserRepository from '../repositories/UserRepository.js';
export default class UserService {
    userRepository;
    constructor() {
        this.userRepository = new UserRepository();
    }
    async getAllUsers() {
        return await this.userRepository.getAllData();
    }
    async getUser(id) {
        return await this.userRepository.getOneData(id);
    }
    async createUser(data) {
        return await this.userRepository.createOneData(data);
    }
    async updateUser(id, data) {
        return await this.userRepository.updateOneData(id, data);
    }
    async findOneUser(query, select = '') {
        return this.userRepository.findOneData(query, select);
    }
    async findUserById(id) {
        return await this.userRepository.findDataById(id);
    }
    async deleteUser(id, active) {
        return await this.userRepository.deleteOneData(id, active);
    }
}
//# sourceMappingURL=UserService.js.map