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
    static getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserRepository.getAllData();
        });
    }
    static getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserRepository.getOneData(id);
        });
    }
    static createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserRepository.createOneData(data);
        });
    }
    static updateUser(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserRepository.updateOneData(id, data);
        });
    }
    static findOneUser(query, select = '') {
        return __awaiter(this, void 0, void 0, function* () {
            return UserRepository.findOneData(query, select);
        });
    }
    static findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserRepository.findDataById(id);
        });
    }
    static deleteUser(id, active) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserRepository.deleteOneData(id, active);
        });
    }
}
//# sourceMappingURL=UserService.js.map