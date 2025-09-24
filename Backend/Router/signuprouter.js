import { Router } from 'express';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { Name, Email, Number, password } = req.body;

    const existingUser = await User.findOne({ Email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newuser = new User({ Name, Email, Number, password: hashedPassword });

    await newuser.save();

    res.status(201).send({ message: 'account Created' });
  } catch (err) {
    res.status(500).json({ message: 'internal server error' });
  }
});

export default router;
