// frontend/components/TaskForm.jsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TaskForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return alert("Título requerido");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description })
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return alert(data.error || "Error creando tarea");
    }

    setTitle(""); setDescription("");
    router.refresh(); // re-render del server component para recargar lista
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 p-4 border rounded-xl bg-white">
      <h2 className="text-xl font-semibold">Nueva tarea</h2>
      <input
        className="w-full border rounded px-3 py-2"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full border rounded px-3 py-2"
        placeholder="Descripción (opcional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className="px-4 py-2 rounded bg-blue-600 text-white">Guardar</button>
    </form>
  );
}
