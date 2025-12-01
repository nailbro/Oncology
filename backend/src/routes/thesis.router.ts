import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import Thesis from "../models/thesis.model";

const router = express.Router();

const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    const allowedTypes = [
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (allowedTypes.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Можно загружать только .doc или .docx"));
  },
});

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { name, email, company, phone } = req.body;
    if (!req.file) return res.status(400).json({ message: "Файл не загружен" });

    const newThesis = new Thesis({
      name,
      email,
      company,
      phone,
      doc: req.file.filename,
    });

    await newThesis.save();
    res.status(201).json(newThesis);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: (err as Error).message });
  }
});

router.get("/", async (_req, res) => {
  try {
    const theses = await Thesis.find().sort({ createdAt: -1 });
    res.json(theses);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
});

export default router;