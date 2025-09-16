# finanzas-senior

Finanzas Senior es una aplicación web diseñada para asistir a adultos mayores en la gestión de sus finanzas, combinando una interfaz intuitiva en React con un backend en Node.js + SQLite.

📂 Estructura del Proyecto
finanzas-senior/
│
├─ backend/       # API y lógica de negocio (Node.js + SQLite)
├─ frontend/      # Interfaz de usuario (React)
├─ package.json   # Scripts principales
└─ .env           # Variables de entorno

⚙ Requisitos

Node.js v18 o superior

npm o yarn

Navegador actualizado: Chrome, Edge, Firefox, Safari

SQLite (opcional; se crea automáticamente)

🚀 Instalación
1️⃣ Clonar el repositorio
git clone https://github.com/tuusuario/finanzas-senior.git
cd finanzas-senior

2️⃣ Configurar variables de entorno

Crea un archivo .env en la raíz del proyecto:

PORT=3000
JWT_SECRET=tu_clave_secreta


3️⃣ Backend
cd backend
npm install        # o yarn install
npm run dev        # ejecutar en desarrollo


Backend disponible en http://localhost:5000.

SQLite se crea automáticamente si no existe.

4️⃣ Frontend (React)
cd ../frontend
npm install        # o yarn install
npm start          # ejecutar en desarrollo


Frontend disponible en http://localhost:3000.

Se conecta automáticamente al backend usando REACT_APP_API_URL.


