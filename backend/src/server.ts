import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db";

import userRoutes from "./routes/user.routes";
import scheduleRoutes from "./routes/schedule.routes";
import thesisRouter from "./routes/thesis.router";
import stepRouter from "./routes/step.router"; // <-- новый роутер
import path from "path";

dotenv.config();

async function startServer() {
  await connectDB();

  const app = express();

  app.use(
    cors({
      origin: process.env.FRONTEND_URL || "*",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
    })
  );

  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  app.use("/uploads", express.static(path.resolve("uploads")));

  app.use("/api/users", userRoutes);
  app.use("/api/schedule", scheduleRoutes);
  app.use("/api/thesis", thesisRouter);
  app.use("/api/step", stepRouter); // <-- подключаем новый роут

  app.get("/", (_req, res) => {
    res.send("✅ Oncology Backend Running");
  });

  app.use((err: any, _req: any, res: any, _next: any) => {
    console.error("Global error:", err);
    res.status(500).json({ message: err.message || "Server error" });
  });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
}

startServer().catch((err) => console.error("Server start error:", err));