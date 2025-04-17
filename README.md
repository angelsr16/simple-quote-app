# Quotes App

## 🚀 Overview

### English Version:

The **Quotes App** is a full-stack web application that allows users to register, log in, and interact with quotes. Users can create, edit, and delete quotes, and view global quotes from other users. Each quote is associated with a movie or TV show title.

#### Key Features:
- **User Authentication**: Users can register, log in, and log out.
- **Global Quotes**: View quotes created by all users.
- **CRUD Operations**: Create, edit, and delete quotes.
- **Movie/TV Show Titles**: Each quote is linked to a movie or TV show.
- **Timestamps**: Each quote has a `created_at` field that tracks when it was created.

---

### Spanish Version:

La **Quotes App** es una aplicación web que permite a los usuarios registrarse, iniciar sesión y gestionar citas. Los usuarios pueden crear, editar y eliminar, además de ver citas globales de otros usuarios. Cada cita está vinculada al título de una película o serie de TV correspondiente.

#### Características Principales:
- **Autenticación de Usuarios**: Los usuarios pueden registrarse, iniciar sesión y cerrar sesión.
- **Citas Globales**: Ver citas creadas por todos los usuarios.
- **Operaciones CRUD**: Crear, editar y eliminar citas.
- **Título de Películas/Series**: Cada cita está asociada a un título de película o serie.
- **Tiempos de Creación**: Cada cita tiene un campo `created_at` que rastrea cuándo se creó.

---

## ⚙️ Tech Stack

### English Version:

This project uses the following technologies and tools:

#### Backend:
- **FastAPI**: A modern, high-performance framework for building APIs with Python, built on top of `Starlette` for the web and `Pydantic` for data validation.
- **MongoDB**: A NoSQL database for storing quotes and user data. MongoDB is highly scalable and flexible, making it ideal for handling JSON-like documents.
- **Pydantic**: Used for data validation in FastAPI, ensuring that user inputs are valid and safe.
- **JWT (JSON Web Tokens)**: A secure authentication system based on tokens for authenticating users.

#### Frontend:
- **Angular**: A robust, dynamic frontend framework for building single-page web applications (SPA) using TypeScript.
- **TypeScript**: A superset of JavaScript that provides better structure and maintainability.
- **RxJS**: A reactive programming library used to handle asynchrony and events in Angular.

---

### Spanish Version:

Este proyecto utiliza las siguientes tecnologías y herramientas:

#### Backend:
- **FastAPI**: Un moderno framework de alto rendimiento para la creación de APIs en Python, basado en `Starlette` para la web y `Pydantic` para la validación de datos.
- **MongoDB**: Base de datos NoSQL para almacenar las citas y los datos de usuario. MongoDB es altamente escalable y flexible, ideal para manejar documentos JSON como las citas.
- **Pydantic**: Usado para la validación de datos en FastAPI, asegurando que las entradas de los usuarios sean válidas y seguras.
- **JWT (JSON Web Tokens)**: Sistema de autenticación basado en tokens, utilizado para autenticar usuarios de manera segura.

#### Frontend:
- **Angular**: Framework de frontend robusto y dinámico para crear aplicaciones web de una sola página (SPA) utilizando TypeScript.
- **TypeScript**: Superset de JavaScript que permite un desarrollo más estructurado y fácil de mantener.
- **RxJS**: Biblioteca para programación reactiva, utilizada para manejar la asincronía y eventos en Angular.

---

## 📥 Setup Instructions

### English Version:

#### Prerequisites:
- **Python 3.7+** for the backend
- **Node.js** and **npm** for the frontend
- **MongoDB** (either a local instance or use MongoDB Atlas)

---

#### 1. Backend Setup (FastAPI + MongoDB)

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/quotes-app.git
    cd quotes-app/backend
    ```

2. Create and activate a virtual environment:

    ```bash
    python3 -m venv venv
    source venv/bin/activate   # For Linux/Mac
    venv\Scripts\activate      # For Windows
    ```

3. Install the required dependencies:

    ```bash
    pip install -r requirements.txt
    ```

4. Set up environment variables:
    - Create a `.env` file in the `backend/` directory with the following content:

    ```env
    MONGO_URL=mongodb://localhost:27017
    SECRET_KEY=your_secret_key_here
    ```

    - Replace `MONGO_URL` with your actual MongoDB connection string.

5. Run the FastAPI application:

    ```bash
    uvicorn main:app --reload
    ```

    The backend will be running on `http://localhost:8000`.

---

#### 2. Frontend Setup (Angular)

1. Navigate to the `frontend/` directory:

    ```bash
    cd frontend
    ```

2. Install the required dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables for the Angular app:
    - Edit `src/environments/environment.ts` and set the API URL to your backend.

    ```typescript
    export const environment = {
      production: false,
      apiUrl: 'http://localhost:8000/api'  // Replace with your backend URL
    };
    ```

4. Run the Angular development server:

    ```bash
    ng serve
    ```

    The frontend will be running on `http://localhost:4200`.

---

### Spanish Version:

#### Requisitos Previos:
- **Python 3.7+** para el backend
- **Node.js** y **npm** para el frontend
- **MongoDB** (puede ser una instancia local o usar MongoDB Atlas)

---

#### 1. Configuración del Backend (FastAPI + MongoDB)

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

#### 2. Configuración del Frontend (Angular)

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
