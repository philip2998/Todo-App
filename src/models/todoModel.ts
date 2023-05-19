import mongoose, { Model, Schema } from 'mongoose';
import { ITodoSchema } from '../interfaces/modelInterfaces.js';

const todoSchema: Schema<ITodoSchema> = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title must have a name'],
  },
  description: {
    type: String,
    required: true,
  },
});

const Todo: Model<ITodoSchema> = mongoose.model<ITodoSchema>(
  'Todo',
  todoSchema
);

export default Todo;
