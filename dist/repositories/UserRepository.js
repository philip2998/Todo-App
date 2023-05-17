var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from '../models/userModel.js';
export default class UserRepository {
    getAllData() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User.find();
        });
    }
    getOneData(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User.findById(id);
        });
    }
    createOneData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newDocument = yield User.create(data);
            return newDocument;
        });
    }
    updateOneData(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User.findByIdAndUpdate(id, data, {
                new: true,
                runValidators: true,
            });
        });
    }
    findOneData(query, select = '') {
        return __awaiter(this, void 0, void 0, function* () {
            return User.findOne(query).select(select);
        });
    }
    findDataById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User.findById(id);
        });
    }
    deleteOneData(id, active) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield User.findByIdAndDelete(id, active);
        });
    }
}
//# sourceMappingURL=UserRepository.js.map