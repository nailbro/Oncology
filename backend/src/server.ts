import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db";
import userRoutes from "./routes/user.router";
import thesisRouter from "./routes/thesis.router";
import stepRouter from "./routes/step.router";
import authRouter from "./routes/auth.router";
import mailRouter from "./routes/mail.router";
import path from "path";

dotenv.config();
dotenv.config({ path: "/etc/secrets/.env" });

async function startServer() {
  try {
    try {
      await connectDB();
    } catch (dbErr) {
      console.warn("⚠️ Database connection failed:", dbErr);
    }

    const app = express();

    app.use((req, res, next) => {
      console.log(`📨 ${req.method} ${req.path} from ${req.ip}`);
      const safeBody = req.body ? JSON.stringify(req.body).substring(0, 100) : "{}";
      console.log(`📦 Body: ${safeBody}`);
      next();
    });

    app.use(cors({
      origin: true, 
      credentials: true,
      methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"]
    }));

    app.use(express.json({ limit: "10mb" }));
    app.use(express.urlencoded({ extended: true, limit: "10mb" }));

    app.use("/uploads", express.static(path.resolve("uploads")));

    app.use("/api/users", userRoutes);
    app.use("/api/thesis", thesisRouter);
    app.use("/api/step", stepRouter);
    app.use("/api/auth", authRouter);
    app.use("/api/mail", mailRouter);

    app.get("/", (_req, res) => {
      res.json({
        status: "✅ Oncology Backend Running",
        version: "1.0.0",
        endpoints: {
          participants: "/api/step",
          mail: "/api/mail/send",
          auth: "/api/auth/login",
          users: "/api/users"
        }
      });
    });

    app.use((err: any, _req: any, res: any, _next: any) => {
      console.error("❌ Global error:", err);
      res.status(500).json({
        message: "❌ Server error",
        error: process.env.NODE_ENV === "development" ? err.message : "Internal error",
      });
    });

    app.use((_req: any, res: any) => {
      res.status(404).json({ message: "❌ Route not found" });
    });

    const PORT = Number(process.env.PORT) || 5000;
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`✅ Server running on 0.0.0.0:${PORT}`);
      console.log(`🌐 FRONTEND_URL_LOCAL: ${process.env.FRONTEND_URL_LOCAL}`);
      console.log(`🌐 FRONTEND_URL_RENDER: ${process.env.FRONTEND_URL_RENDER}`);
      console.log(`🌐 FRONTEND_URL_VERCEL: ${process.env.FRONTEND_URL_VERCEL}`);
      console.log(`📋 Participants endpoint: http://localhost:${PORT}/api/step`);
      console.log(`✅ CORS enabled for all origins`);
    });

  } catch (err) {
    console.error("❌ Server start error:", err);
    process.exit(1);
  }
}

startServer();