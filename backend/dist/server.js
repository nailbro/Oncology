import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db";
import userRoutes from "./routes/user.routes";
import scheduleRoutes from "./routes/schedule.routes";
dotenv.config();
async function startServer() {
    await connectDB();
    const app = express();
    app.use(cors({
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    }));
    app.use(express.json());
    app.use("/api/users", userRoutes);
    app.use("/api/schedule", scheduleRoutes);
    app.get("/", (_req, res) => {
        res.send("✅ Oncology Backend Running");
    });
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
}
startServer().catch((err) => console.error("Server start error:", err));
