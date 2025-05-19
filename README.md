# 🚀 App de Envíos - Frontend

Este proyecto es la interfaz web para el sistema de gestión de envíos.

## 📦 Tecnologías principales

- ⚛️ React + Vite 
- ⛓️ TypeScript
- 💨 TailwindCSS
- 🔌 WebSocket
- 📡 Axios con token JWT
- 🧪 Testing con Jest + React Testing Library
- 🔐 Autenticación con contexto global
- 🚌 Rutas con React Router
- 📁 Arquitectura modular y limpia (Clean Architecture)

---

## 🚀 Instalación

# Requisitos previos
- Tener instalado **Node.js ≥ 18**
- Tener corriendo el backend en `http://localhost:3000`

---

1. Clona el repositorio:

```bash
git clone <repositorio>
cd <a la carpeta>
```

2. Instala las dependencias:

```bash
npm install
```

3. Inicia el backend en otro terminal o máquina.

4. Ejecuta el frontend:

```bash
npm run dev
```

Esto abrirá la aplicación en `http://localhost:5173`.

---

## 🧪 Scripts disponibles

| Comando        | Descripción                         |
|----------------|-------------------------------------|
| `npm run dev`  | Ejecuta el servidor de desarrollo en `http://localhost:5173` |
| `npm run build`| Compila el proyecto en `dist/`      |
| `npm run preview` | Visualiza la app compilada        |
| `npm run test` | Ejecuta pruebas unitarias con Jest  |
| `npm run test:watch` | Modo vigilancia para test      |
| `npm run lint` | Linting del proyecto con ESLint     |

---

## ⚙️ Variables de entorno

Crea un archivo `.env` en la raíz del frontend:

```env
VITE_BASE_URL_API='http://localhost:3000'
VITE_WS_PROTOCOL='ws'
VITE_HTTP_PROTOCOL='http'
```

---

## 🗂️ Estructura del proyecto

```
src/
├── components/        # Componentes reutilizables
├── context/           # Contexto de autenticación
├── hooks/             # Hooks personalizados
├── layouts/           # Layout principal
├── pages/             # Vistas principales por ruta
├── routes/            # Enrutador principal
├── services/          # Conexión con API (Axios)
├── types/             # Definiciones de interfaces
├── utils/             # Utilidades generales
├── config/            # Configuración global
├── main.tsx           # Entry point
└── App.tsx            # Setup de layout + rutas
```

---

## 🧠 Funcionalidades principales

### 🧑 Usuario

- Registro y login
- Crear órdenes de envío
- Ver historial de órdenes
- Ver el estado en tiempo real con WebSocket

### 👨‍💼 Administrador

- Asignar transportistas y rutas
- Ver todas las órdenes pendientes
- Ver reportes filtrados con gráficas (Recharts)

---

## 🔍 Testing

Las pruebas están ubicadas en archivos `.test.tsx`.

Ejemplo:

```bash
npm run test
```

Frameworks usados:

- Jest
- Testing Library

---

## 📬 Contacto

Jorge Munera
Fullstack Software Developer
📍 Colombia
📞 +57 316 823 4878
📧 gerjo9211@hotmail.com
