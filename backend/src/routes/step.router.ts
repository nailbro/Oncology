import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { randomUUID } from "crypto";

const router = express.Router();

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const dataDir = path.join(__dirname, "../data");
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
const dataFile = path.join(dataDir, "participants.json");

let participants: any[] = [];

function loadParticipants() {
  try {
    if (fs.existsSync(dataFile)) {
      const data = fs.readFileSync(dataFile, "utf-8");
      participants = JSON.parse(data);
      console.log(`✅ Загружено ${participants.length} участников из файла`);
    }
  } catch (err) {
    console.error("❌ Ошибка чтения participants.json:", err);
    participants = [];
  }
}

function saveParticipants() {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(participants, null, 2));
    console.log("✅ Участники сохранены в файл");
  } catch (err) {
    console.error("❌ Ошибка сохранения participants.json:", err);
  }
}

loadParticipants();

participants = participants.map((p: any) => ({
  ...p,
  _id: p._id || randomUUID(),
}));
saveParticipants();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});
const upload = multer({ storage });

router.post("/", upload.single("paymentFile"), (req, res) => {
  const { name, email, company, phone } = req.body;
  const paymentFile = req.file;

  if (!name || !email || !company || !phone || !paymentFile) {
    return res.status(400).json({ message: "Не все поля заполнены" });
  }

  const participant = {
    _id: randomUUID(),
    name: name.trim(),
    email: email.trim(),
    company: company.trim(),
    phone: phone.trim(),
    check: paymentFile.filename,
    confirmed: false,
    createdAt: new Date().toISOString(),
  };

  participants.push(participant);
  saveParticipants();

  console.log(`✅ Новый участник добавлен: ${name}`);
  res.json({ 
    message: "✅ Данные успешно получены", 
    file: paymentFile.filename, 
    _id: participant._id,
    participant,
  });
});

router.get("/", (_req, res) => {
  console.log(`📋 GET /api/step - возвращаю ${participants.length} участников`);
  res.json(participants);
});

router.get("/:id", (req, res) => {
  const participant = participants.find(p => p._id === req.params.id);
  
  if (!participant) {
    return res.status(404).json({ message: "Участник не найден" });
  }

  res.json(participant);
});

router.patch("/:id/confirm", (req, res) => {
  const participantId = req.params.id;
  const participant = participants.find(p => p._id === participantId);

  if (!participant) {
    console.error(`❌ Участник не найден: ${participantId}`);
    return res.status(404).json({ message: "Участник не найден" });
  }

  participant.confirmed = true;
  participant.confirmedAt = new Date().toISOString();
  saveParticipants();

  console.log(`✅ Участник подтвержден: ${participant.name}`);
  res.json({ 
    message: "✅ Участник подтверждён", 
    participant,
  });
});

router.delete("/:id", (req, res) => {
  const participantId = req.params.id;
  const index = participants.findIndex(p => p._id === participantId);

  if (index === -1) {
    return res.status(404).json({ message: "Участник не найден" });
  }

  const deleted = participants.splice(index, 1);
  saveParticipants();

  console.log(`🗑️ Участник удален: ${deleted[0].name}`);
  res.json({ message: "✅ Участник удален", participant: deleted[0] });
});

export default router;