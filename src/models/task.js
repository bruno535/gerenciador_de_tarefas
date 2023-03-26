import { Schema, model } from 'mongoose';

const TaskSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    priority: { type: Number, required: true },
});
const Task = model('Task', TaskSchema);

export default Task;
