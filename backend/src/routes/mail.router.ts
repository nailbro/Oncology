import { Router } from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();
const router = Router();

const dataDir = path.join(__dirname, "../data");
const dataFile = path.join(dataDir, "participants.json");

const port = Number(process.env.SMTP_PORT) || 587;
const secure = port === 465; 

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port,
  secure,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD, 
  },
  tls: {
    rejectUnauthorized: false, 
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP connection error:", error);
  } else {
    console.log("✅ SMTP server is ready to send emails");
  }
});

router.post("/send", async (req, res) => {
  const { email, name, check, participantId } = req.body;

  if (!email || !name || !check || !participantId) {
    return res.status(400).json({ message: "Email, name, check и participantId обязательны" });
  }

  const mailOptions = {
    from: `"Oncology Event" <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: "Подтверждение участия на Gala Dinner",
    text: `Здравствуйте, ${name}!\n\nВаше участие подтверждено.\nФайл: ${check}\n\nС уважением,\nОрганизаторы.`,
    html: `<p>Здравствуйте, <b>${name}</b>!</p>
           <p>Ваше участие подтверждено.</p>
           <p>Файл: ${check}</p>
           <p>С уважением,<br/>Организаторы.</p>`,
  };

  try {
    console.log(`📧 Отправка письма на ${email}...`);
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Письмо отправлено: ${info.messageId}`);

    if (fs.existsSync(dataFile)) {
      const participants = JSON.parse(fs.readFileSync(dataFile, "utf-8"));
      const participant = participants.find((p: any) => p._id === participantId);

      if (participant) {
        participant.confirmed = true;
        fs.writeFileSync(dataFile, JSON.stringify(participants, null, 2));
        console.log(`✅ Участник ${participantId} подтвержден в файле`);
      }
    }

    res.status(200).json({ 
      message: "✅ Письмо отправлено и участник подтвержден",
      participantId,
    });
  } catch (err: any) {
    console.error("❌ Email error:", err);
    res.status(500).json({ 
      message: "Ошибка при отправке письма", 
      error: process.env.NODE_ENV === "development" ? err.message : "Internal server error" 
    });
  }
});

export default router;
