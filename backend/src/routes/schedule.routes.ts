import express, { Request, Response } from "express";
import Schedule from '../models/schedule.model';

const router = express.Router();

// GET all schedules
router.get("/", async (_req: Request, res: Response) => {
  try {
    const schedules = await Schedule.find();
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
});

export default router;