import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title must have a name'],
  },
  description: {
    type: String,
    required: true,
  },
});

const Todo = mongoose.model('Todo', TodoSchema);

export default Todo;
