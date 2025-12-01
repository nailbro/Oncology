import { Router } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Введите email и пароль" });

    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
    const JWT_SECRET = process.env.JWT_SECRET || "secret";

    if (!ADMIN_EMAIL || !ADMIN_PASSWORD)
      return res.status(500).json({ message: "Администратор не настроен" });

    if (email !== ADMIN_EMAIL)
      return res.status(400).json({ message: "Неверный email" });

    if (password !== ADMIN_PASSWORD)
      return res.status(400).json({ message: "Неверный пароль" });

    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1d" });

    res.json({ message: "Вы успешно вошли!", token, email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
});

export default router;