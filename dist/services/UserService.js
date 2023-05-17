var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import UserRepository from '../repositories/UserRepository.js';
export default class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.getAllData();
        });
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.getOneData(id);
        });
    }
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.createOneData(data);
        });
    }
    updateUser(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.updateOneData(id, data);
        });
    }
    findOneUser(query, select = '') {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.findOneData(query, select);
        });
    }
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.findDataById(id);
        });
    }
    deleteUser(id, active) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.deleteOneData(id, active);
        });
    }
}
//# sourceMappingURL=UserService.js.map