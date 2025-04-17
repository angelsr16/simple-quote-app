# Quotes App

## 🚀 Resumen

La **Quotes App** es una aplicación web completa que permite a los usuarios registrarse, iniciar sesión y gestionar citas. Los usuarios pueden crear, editar y eliminar citas, además de ver citas globales de otros usuarios. Cada cita está vinculada a un título de una película o serie de TV, y contiene el contenido de la cita y una marca de tiempo de cuando se creó.

### Características Principales:
- **Autenticación de Usuarios**: Los usuarios pueden registrarse, iniciar sesión y cerrar sesión.
- **Citas Globales**: Ver citas creadas por todos los usuarios.
- **Operaciones CRUD**: Crear, editar y eliminar citas.
- **Título de Películas/Series**: Cada cita está asociada a un título de película o serie.
- **Tiempos de Creación**: Cada cita tiene un campo `created_at` que rastrea cuándo se creó.

---

## ⚙️ Stack Tecnológico

Este proyecto utiliza las siguientes tecnologías y herramientas:

### Backend:
- **FastAPI**: Un moderno framework de alto rendimiento para la creación de APIs en Python, basado en `Starlette` para la web y `Pydantic` para la validación de datos.
- **MongoDB**: Base de datos NoSQL para almacenar las citas y los datos de usuario. MongoDB es altamente escalable y flexible, ideal para manejar documentos JSON como las citas.
- **Pydantic**: Usado para la validación de datos en FastAPI, asegurando que las entradas de los usuarios sean válidas y seguras.
- **JWT (JSON Web Tokens)**: Sistema de autenticación basado en tokens, utilizado para autenticar usuarios de manera segura.
  
### Frontend:
- **Angular**: Framework de frontend robusto y dinámico para crear aplicaciones web de una sola página (SPA) utilizando TypeScript.
- **TypeScript**: Superset de JavaScript que permite un desarrollo más estructurado y fácil de mantener.
- **RxJS**: Biblioteca para programación reactiva, utilizada para manejar la asincronía y eventos en Angular.

### Otros:
- **Docker** (opcional): Usado para la contenerización de la aplicación, facilitando su despliegue y escalabilidad.

---

## 📥 Instrucciones de Configuración

### Requisitos Previos:
- **Python 3.7+** para el backend
- **Node.js** y **npm** para el frontend
- **MongoDB** (puede ser una instancia local o usar MongoDB Atlas)

---

### 1. Configuración del Backend (FastAPI + MongoDB)

1. Clona el repositorio:

    ```bash
    git clone https://github.com/tu-usuario/nombre-del-repositorio.git
    cd nombre-del-repositorio/backend
    ```

2. Crea y activa un entorno virtual:

    ```bash
    python3 -m venv venv
    source venv/bin/activate   # Para Linux/Mac
    venv\Scripts\activate      # Para Windows
    ```

3. Instala las dependencias necesarias:

    ```bash
    pip install -r requirements.txt
    ```

4. Configura las variables de entorno:
    - Crea un archivo `.env` en el directorio `backend/` con el siguiente contenido:

    ```env
    MONGO_URL=mongodb://localhost:27017
    SECRET_KEY=tu_clave_secreta_aqui
    ```

    - Reemplaza `MONGO_URL` con tu cadena de conexión a MongoDB.

5. Ejecuta la aplicación de FastAPI:

    ```bash
    uvicorn main:app --reload
    ```

    El backend estará corriendo en `http://localhost:8000`.

---

### 2. Configuración del Frontend (Angular)

1. Navega al directorio `frontend/`:

    ```bash
    cd frontend
    ```

2. Instala las dependencias necesarias:

    ```bash
    npm install
    ```

3. Configura las variables de entorno para la aplicación Angular:
    - Edita `src/environments/environment.ts` y establece la URL de la API de tu backend.

    ```typescript
    export const environment = {
      production: false,
      apiUrl: 'http://localhost:8000/api'  // Reemplázalo con tu URL del backend
    };
    ```

4. Ejecuta el servidor de desarrollo de Angular:

    ```bash
    ng serve
    ```

    El frontend estará corriendo en `http://localhost:4200`.

---

## 📝 Estructura del Proyecto

```bash
├── backend/              # Backend con FastAPI
│   ├── app/              # Aplicación FastAPI
│   ├── requirements.txt  # Dependencias del backend
│   ├── .env             # Variables de entorno (¡no lo subas a Git!)
│   └── main.py          # Punto de entrada de FastAPI
├── frontend/             # Frontend con Angular
│   ├── src/              # Código fuente de Angular
│   ├── package.json      # Dependencias del frontend
│   ├── angular.json      # Configuración de Angular
│   └── src/environments  # Archivos de configuración del entorno
├── .gitignore            # Configuración de archivos ignorados por Git
└── README.md             # Documentación del proyecto
