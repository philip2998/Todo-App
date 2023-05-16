var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Todo from '../models/todoModel.js';
export default class TodoRepository {
    static getAllData() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Todo.find();
        });
    }
    static getOneData(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Todo.findById(id);
        });
    }
    static createOneData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const newDocument = yield Todo.create(data);
            return newDocument;
        });
    }
    static updateOneData(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Todo.findByIdAndUpdate(id, data, {
                new: true,
                runValidators: true,
            });
        });
    }
    static deleteOneData(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Todo.findByIdAndDelete(id);
        });
    }
}
//# sourceMappingURL=TodoRepository.js.map