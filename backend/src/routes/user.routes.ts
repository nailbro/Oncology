import express, { Request, Response } from "express";
import User from '../models/user.model';

const router = express.Router();

// GET all users
router.get("/", async (_req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
});

// POST new user
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, email, company, phone } = req.body;
    const newUser = new User({ name, email, company, phone });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
});

export default router;