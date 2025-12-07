# Acortador de URL — Instrucciones para desarrollo

Pasos rápidos para preparar el proyecto localmente antes de subir al repositorio.

- Copia los ejemplos de variables de entorno y rellénalos con valores reales:
  - `backend/.env.example` -> `backend/.env`
  - `frontend/.env.example` -> `frontend/.env`

- Backend (desde `backend/`):
  - Instala dependencias: `npm install`
  - Ejecuta en desarrollo: `npm run dev` (usa `nodemon`)

- Frontend (desde `frontend/`):
  - Instala dependencias: `npm install`
  - Ejecuta en desarrollo: `npm run dev` o `npm run start` según `package.json`

- Notas de seguridad:
  - No incluyas `backend/.env` ni `frontend/.env` en el repositorio. Ya hay un `.gitignore` en la raíz que ignora archivos `.env`.
  - Reemplaza los valores por defecto en `backend/.env` (JWT y credenciales de BD) antes de usar en producción.

- Otros consejos:
  - Si ves dependencias faltantes en el backend, ejecuta `npm install` en `backend/`.
  - Para cambiar el origen permitido por CORS, ajusta `FRONTEND_URL` en `backend/.env`.

Si quieres, puedo actualizar `frontend` para que use `VITE_API_URL` desde su `.env` en todas las llamadas al API.
