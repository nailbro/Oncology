import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Папка для загрузок
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Папка для данных
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
const dataFile = path.join(dataDir, 'participants.json');

// Загружаем участников из файла при старте
let participants: any[] = [];
if (fs.existsSync(dataFile)) {
  try {
    participants = JSON.parse(fs.readFileSync(dataFile, 'utf-8'));
  } catch (err) {
    console.error('Ошибка чтения participants.json:', err);
  }
}

// Настройка multer
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// POST: получить Step1 + Step2
router.post('/', upload.single('paymentFile'), (req, res) => {
  const { name, email, company, phone } = req.body;
  const paymentFile = req.file;

  if (!name || !email || !company || !phone || !paymentFile) {
    return res.status(400).json({ message: 'Не все поля заполнены' });
  }

  const participant = {
    name,
    email,
    company,
    phone,
    check: paymentFile.filename,
    createdAt: new Date().toISOString(),
  };

  participants.push(participant);

  // Сохраняем в файл
  fs.writeFileSync(dataFile, JSON.stringify(participants, null, 2));

  console.log('✅ Новый участник:', participant);
  res.json({ message: 'Данные успешно получены', file: paymentFile.filename });
});

// GET: получить всех участников
router.get('/', (_req, res) => {
  res.json(participants);
});

export default router;