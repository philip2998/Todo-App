import mongoose from 'mongoose';
const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title must have a name'],
    },
    description: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
    },
});
const Todo = mongoose.model('Todo', todoSchema);
export default Todo;
//# sourceMappingURL=todoModel.js.map