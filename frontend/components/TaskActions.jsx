// frontend/components/TaskActions.jsx
"use client";

import { useRouter } from "next/navigation";

export default function TaskActions({ id, done }) {
  const router = useRouter();

  async function toggle() {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: !done }),
    });
    router.refresh(); // vuelve a pedir los datos del server component
  }

  async function remove() {
    if (!confirm("¿Eliminar esta tarea?")) return;
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks/${id}`, {
      method: "DELETE",
    });
    router.refresh();
  }

  return (
    <div className="flex items-center gap-2 shrink-0">
      <span className={`text-xs px-2 py-1 rounded ${done ? "bg-green-100" : "bg-yellow-100"}`}>
        {done ? "Hecha" : "Pendiente"}
      </span>
      <button onClick={toggle} className="px-2 py-1 rounded border">
        {done ? "Desmarcar" : "Marcar"}
      </button>
      <button onClick={remove} className="px-2 py-1 rounded border border-red-500 text-red-600">
        Eliminar
      </button>
    </div>
  );
}
