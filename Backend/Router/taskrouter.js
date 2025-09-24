import express from 'express';
import Task from '../models/Task.js';
import { authMiddleware } from '../Middleware/auth.js';

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { task1 } = req.body;
    if (!task1)
      return res
        .status(400)
        .json({ success: false, message: 'Task cannot be empty' });

    const newTask = new Task({ task1, user: req.user.id });
    await newTask.save();

    res.status(201).json({ success: true, task: newTask });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json({ success: true, tasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
