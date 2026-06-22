# TaskFlow 📝✨

TaskFlow is a modern, responsive, and feature-rich Task Management web application built with the **MERN** stack (MongoDB, Express, React, Node.js). With a focus on UI/UX, TaskFlow provides a seamless experience for organizing your daily tasks.

## 🚀 Features

- **Full CRUD Operations**: Create, Read, Update, and Delete your tasks effortlessly.
- **Drag and Drop**: Reorder your tasks intuitively with smooth drag-and-drop mechanics (powered by `@dnd-kit`).
- **Advanced Filtering**: Filter tasks by status (All, Active, Completed) or by time frames (Today, This Week, This Month, All Time).
- **Pagination**: Navigate through long lists of tasks easily without overloading the UI.
- **Modern UI/UX**: Beautiful gradient backgrounds, glassmorphism elements, micro-animations, and fully responsive design using TailwindCSS and `shadcn/ui`.
- **Toast Notifications**: Real-time feedback for user actions via `sonner`.

## 🛠️ Tech Stack

**Frontend:**
- [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- [TailwindCSS v4](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) (Radix UI)
- [dnd-kit](https://dndkit.com/) for drag & drop
- [Lucide React](https://lucide.dev/) for icons
- [Axios](https://axios-http.com/) for API requests

**Backend:**
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)

## 📂 Project Structure

The repository is organized into a client-server architecture:

```text
TaskFlow/
├── backend/            # Express.js server & MongoDB models
│   ├── src/
│   │   ├── config/     # Database connection settings
│   │   ├── controllers/# Business logic (CRUD, Reorder)
│   │   ├── models/     # Mongoose schemas (Task)
│   │   ├── route/      # API endpoints
│   │   └── server.js   # Main entry point
│   └── package.json
│
└── frontend/           # React + Vite application
    ├── src/
    │   ├── components/ # Reusable UI components (TaskCard, Header, etc.)
    │   ├── lib/        # Utilities (Axios config, dummy data, helpers)
    │   ├── pages/      # Route pages (HomePage, NotFound)
    │   ├── App.jsx     # Main React App & Router
    │   └── index.css   # Global styles & Tailwind
    └── package.json
```

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB Database (Local or MongoDB Atlas)

### 1. Clone the repository
```bash
git clone https://github.com/hoangducanh2005/TaskFlow.git
cd TaskFlow
```

### 2. Backend Setup
```bash
cd backend
npm install
```
- Create a `.env` file in the `backend/` directory and add your MongoDB connection string:
  ```env
  MONGODB_URI=your_mongodb_connection_string_here
  PORT=5001
  ```
- Start the backend server:
  ```bash
  npm run dev
  ```
  *(Server runs on http://localhost:5001)*

### 3. Frontend Setup
Open a new terminal window.
```bash
cd frontend
npm install
```
- Create a `.env` file in the `frontend/` directory if needed, hoặc dùng cổng mặc định gọi API tới `http://localhost:5001/api`.
- Start the frontend development server:
  ```bash
  npm run dev
  ```
  *(App runs on http://localhost:5173)*

## 💡 Usage

1. Open your browser and navigate to `http://localhost:5173`.
2. Add a new task by typing in the input field and clicking **Add**.
3. Reorder tasks by holding the grip icon on the left side of any task and dragging it up or down.
4. Mark a task as completed by clicking the circle on the left.
5. Use the filter tabs at the bottom to view **Active** or **Completed** tasks.
6. Use the top-right dropdown to filter tasks by date range.

---
*No job is too hard, only afraid of not trying 💪*
