export default class Repository {
    model;
    constructor(model) {
        this.model = model;
    }
    async getAllData() {
        return await this.model.find();
    }
    async getOneData(id) {
        return await this.model.findById(id);
    }
    async getUserTodos(userId) {
        return await this.model.find({ userId });
    }
    async createOneData(data) {
        const newDocument = await this.model.create(data);
        return newDocument;
    }
    async updateOneData(id, data) {
        return await this.model.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });
    }
    async deleteOneData(id, active) {
        return await this.model.findByIdAndDelete(id, active);
    }
}
//# sourceMappingURL=Repository.js.map