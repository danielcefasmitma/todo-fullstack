// frontend/app/page.js
import TaskForm from "@/components/TaskForm";
import TaskActions from "@/components/TaskActions";

async function getTasks() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tasks`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Backend no responde");
  return res.json();
}

export default async function Home() {
  const tasks = await getTasks();

  return (
    <main className="min-h-screen p-6 max-w-3xl mx-auto space-y-6 bg-gray-50">
      <h1 className="text-3xl font-bold">To-Do CRUD (Next + Express + Mongo)</h1>

      <TaskForm />

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Tareas</h2>

        {tasks.length === 0 && <p className="text-gray-500">No hay tareas aún.</p>}

        <ul className="space-y-2">
          {tasks.map((t) => (
            <li key={t._id} className="p-4 border rounded-xl bg-white flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="font-medium truncate">{t.title}</p>
                {t.description && (
                  <p className="text-sm text-gray-600 truncate">{t.description}</p>
                )}
              </div>

              {/* Botones cliente */}
              <TaskActions id={t._id} done={t.done} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
