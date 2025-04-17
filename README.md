# Full Stack Application: FastAPI + MongoDB + Angular

## 🚀 Overview

This is a **Full Stack Web Application** built with a **FastAPI** backend and an **Angular** frontend. The backend uses **MongoDB** as a database for storing data and implements authentication and authorization mechanisms. The frontend is a **modern Angular application** that interacts with the backend through RESTful APIs.

### Key Features:
- **FastAPI Backend**: High-performance web framework for building APIs with Python 3.7+.
- **MongoDB**: NoSQL database to store and manage data.
- **Angular Frontend**: Robust and dynamic frontend with Angular, connecting to the FastAPI backend.
- **Authentication & Authorization**: Secure user registration and login features.

---

## ⚙️ Tech Stack

- **Backend**:
  - FastAPI (Python)
  - MongoDB (Database)
  - Pydantic (Data validation)
  - JWT (JSON Web Tokens for secure authentication)
  
- **Frontend**:
  - Angular (Frontend framework)
  - TypeScript (Language)
  - RxJS (Reactive programming)
  
---

## 📥 Setup Instructions

### Prerequisites:
- **Python 3.7+** for the backend
- **Node.js** and **npm** for the frontend
- **MongoDB** (either a local instance or MongoDB Atlas)

---

### 1. Backend Setup (FastAPI + MongoDB)

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/project-name.git
    cd project-name/backend
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

### 2. Frontend Setup (Angular)

1. Navigate to the `frontend/` directory:

    ```bash
    cd frontend
    ```

2. Install the required dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables for the Angular app:
    - Edit `src/environments/environment.ts` and set the API URL to your FastAPI backend.

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

## 📝 Project Structure

```bash
├── backend/              # FastAPI Backend
│   ├── app/              # FastAPI application
│   ├── requirements.txt  # Backend dependencies
│   ├── .env             # Environment variables (don't commit this file!)
│   └── main.py          # FastAPI entry point
├── frontend/             # Angular Frontend
│   ├── src/              # Angular source code
│   ├── package.json      # Frontend dependencies
│   ├── angular.json      # Angular configuration
│   └── src/environments  # Frontend environment files
├── .gitignore            # Git ignore configuration
└── README.md             # Project documentation
