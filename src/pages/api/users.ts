import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      });

      const text = await response.text();

      if (!response.ok) {
        if (text.includes("E11000 duplicate key")) {
          return res.status(400).json({ message: "Пользователь с таким email уже существует" });
        }
        return res.status(response.status).json({ message: text });
      }

      const data = JSON.parse(text);
      return res.status(200).json(data);
    } catch (error) {
      console.error("Network Error:", error);
      return res.status(500).json({ message: "Серверная ошибка. Попробуйте позже" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ message: `Метод ${req.method} не разрешен` });
  }
}