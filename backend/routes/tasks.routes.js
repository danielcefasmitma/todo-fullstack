// backend/routes/tasks.routes.js
import { Router } from "express";
import mongoose from "mongoose";
import Task from "../models/Task.js";

const router = Router();
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// GET /api/tasks -> listar
router.get("/", async (_req, res, next) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) { next(err); }
});

// GET /api/tasks/:id -> obtener una
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ error: "ID inválido" });
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ error: "No encontrada" });
    res.json(task);
  } catch (err) { next(err); }
});

// POST /api/tasks -> crear
router.post("/", async (req, res, next) => {
  try {
    const { title, description = "" } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ error: "title es requerido" });
    }
    const newTask = await Task.create({ title: title.trim(), description });
    res.status(201).json(newTask);
  } catch (err) { next(err); }
});

// PATCH /api/tasks/:id -> actualizar parcialmente
router.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ error: "ID inválido" });

    const allowed = ["title", "description", "done"];
    const payload = {};
    for (const k of allowed) if (k in req.body) payload[k] = req.body[k];

    const updated = await Task.findByIdAndUpdate(id, { $set: payload }, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: "No encontrada" });

    res.json(updated);
  } catch (err) { next(err); }
});

// DELETE /api/tasks/:id -> eliminar
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ error: "ID inválido" });
    const deleted = await Task.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "No encontrada" });
    res.json({ ok: true, message: "Eliminada" });
  } catch (err) { next(err); }
});

export default router;
