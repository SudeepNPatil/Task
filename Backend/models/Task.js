import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  task1: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Task', taskSchema);
