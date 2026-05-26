# Course Registration System 

A full-stack web application designed to manage university course enrollments. It features role-based access control (Student/Admin), real-time seat tracking, and duplicate enrollment prevention using database transactions.

Built with **FastAPI** (Python) and **React** (Vite).

## Tech Stack

### Backend
- **Framework:** FastAPI (Python 3.10+)
- **Database:** SQLite (SQLAlchemy ORM)
- **Authentication:** OAuth2 with JWT (JSON Web Tokens)
- **Validation:** Pydantic & Email-Validator

### Frontend
- **Framework:** React.js (Vite)
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios (with Interceptors)
- **Routing:** React Router v6

---

## Features

### Student Role
- **Browse Catalog:** View courses with real-time status (Open/Closed) and seat availability.
- **Enrollment:** One-click enrollment with capacity checks.
- **My Schedule:** View enrolled courses and drop classes.
- **Validation:** Prevents duplicate enrollments or joining full courses.

### 🛠 Admin Role
- **Dashboard:** Create, update, and delete courses.
- **Management:** Toggle course status (Open/Close) manually.
- **Insights:** View enrollment counts per course.

---

## Installation & Setup

### Prerequisites
- Python 3.10+
- Node.js v18+

### 1. Clone the Repository
```bash
git clone [https://github.com/yourusername/university-system.git](https://github.com/Sumanth-YM/Course_Registration_System)
cd Course_Registration_System
```

### 2. Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
.\venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
pip install email-validator

# Run the server
uvicorn main:app --reload
```
*The Backend runs at `http://127.0.0.1:8000`*

### 3. Frontend Setup
Open a new terminal window.
```bash
cd frontend

# Install dependencies
npm install

# Run the development server
npm run dev
```
*The Frontend runs at `http://localhost:5173`*

---

## API Documentation
Once the backend is running, you can access the automatic interactive API documentation provided by Swagger UI:
- **URL:** `http://127.0.0.1:8000/docs`

---

## Usage Guide

Since the database is empty upon initialization, follow these steps:

1.  **Create an Admin:**
    - Go to `/register`.
    - Enter details and select Role: **Admin**.
    - Log in and go to the Admin Dashboard to create courses.

2.  **Create a Student:**
    - Log out.
    - Go to `/register`.
    - Enter details and select Role: **Student**.
    - Log in and go to the Course Catalog to enroll.

---

## Project Structure

```text
university-system/
├── backend/
│   ├── routers/          # API endpoints (auth, courses, enrollments)
│   ├── database.py       # DB connection
│   ├── models.py         # SQLAlchemy tables
│   ├── schemas.py        # Pydantic DTOs
│   ├── security.py       # JWT & Hashing logic
│   └── main.py           # App entry point
│
├── frontend/
│   ├── src/
│   │   ├── api/          # Axios setup
│   │   ├── components/   # UI components (Navbar, ProtectedRoute)
│   │   ├── context/      # Auth state management
│   │   └── pages/        # React pages (Login, Dashboard, Catalog)
│   └── tailwind.config.js
│
└── README.md
```
