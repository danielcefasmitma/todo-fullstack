// backend/index.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./db.js";
import tasksRouter from "./routes/tasks.routes.js";

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// CORS: permite al frontend (Next) consumir la API
app.use(cors({ origin: process.env.FRONTEND_ORIGIN }));

// Rutas API
app.use("/api/tasks", tasksRouter);

// 404 para rutas API inexistentes
app.use("/api/*", (_req, res) => res.status(404).json({ error: "Ruta no encontrada" }));

// Manejo de errores
app.use((err, _req, res, _next) => {
  console.error("❌ Error:", err);
  res.status(500).json({ error: "Error interno del servidor" });
});

// Iniciar
const PORT = process.env.PORT || 4000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 API en http://localhost:${PORT}`));
});
