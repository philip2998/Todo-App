import User from '../models/userModel.js';
import Repository from './Repository.js';
export default class UserRepository extends Repository {
    constructor() {
        super(User);
    }
    async findOneData(query, select = '') {
        return this.model.findOne(query).select(select);
    }
    async findDataById(id) {
        return await this.model.findById(id).select('+password');
    }
}
//# sourceMappingURL=UserRepository.js.map