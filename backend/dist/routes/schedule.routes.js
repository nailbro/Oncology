import express from "express";
import Schedule from '../models/schedule.model';
const router = express.Router();
// GET all schedules
router.get("/", async (_req, res) => {
    try {
        const schedules = await Schedule.find();
        res.json(schedules);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
export default router;
