import Repository from './Repository.js';
import Todo from '../models/todoModel.js';
export default class TodoRepository extends Repository {
    constructor() {
        super(Todo);
    }
    async findOneData(query, select = '') {
        return this.model.findOne(query).select(select);
    }
}
//# sourceMappingURL=todoRepository.js.map