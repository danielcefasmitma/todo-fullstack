# Todo Fullstack App

Aplicación fullstack de tareas construida con:
- Frontend: Next.js
- Backend: Express
- Database: MongoDB

## Estructura
```
todo-fullstack/
├── frontend/    # Next.js frontend
└── backend/     # Express API
```

## Configuración

### Backend
1. Crear archivo `.env`:
```
PORT=4000
MONGODB_URI=mongodb://127.0.0.1:27017/todo_fullstack
FRONTEND_ORIGIN=http://localhost:3000
```

### Frontend
1. Crear archivo `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## Instalación

1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
```

2. Instalar dependencias
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3. Iniciar aplicación
```bash
# Backend
cd backend
npm run dev

# Frontend (en otra terminal)
cd frontend
npm run dev
```