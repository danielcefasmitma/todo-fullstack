// backend/models/Task.js
import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    done: { type: Boolean, default: false }
  },
  { timestamps: true }
);

// Reusa el modelo si ya existe (evita error en recargas)
export default mongoose.models.Task || mongoose.model("Task", TaskSchema);
