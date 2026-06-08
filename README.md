# DevConnect 🚀

> A real-time developer collaboration platform — discover projects, join teams, chat, and code together.

![DevConnect Banner](https://devconnect101.vercel.app/)

🔗 **Live Demo:** [devconnect101.vercel.app](https://devconnect101.vercel.app/)

---

## 📌 About

**DevConnect** is a full-stack web application that brings developers together. Users can post and discover projects, join teams as collaborators, follow each other, chat in real time, and even write code together in a shared collaborative editor — all in one platform.

---

## ✨ Features

- 🔐 **Authentication** — Secure signup & login with JWT & bcrypt
- 🗂️ **Project Dashboard** — Browse community-posted projects from developers
- 👥 **Team Collaboration** — Join projects as a teammate or post your own
- 👣 **Follow / Unfollow** — Build your developer network
- 💬 **Real-time Messaging** — 1:1 chat powered by Socket.io
- 🧑‍💻 **Collaborative Code Editor** — Live shared coding using Monaco Editor + Yjs CRDTs
- 🛠️ **Project CRUD** — Create, read, update, and delete your projects
- 🧭 **Sidebar Navigation** — Projects, My Projects, Messages, Developers, Profile, Settings

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 + Vite 7 | UI framework & build tool |
| React Router v7 | Client-side routing |
| Tailwind CSS v4 + shadcn/ui + Radix UI | Styling & UI components |
| Monaco Editor | Code editor (VS Code-like) |
| Yjs + y-websocket | CRDT-based real-time collaborative editing |
| Socket.io Client | Real-time messaging |
| React Hook Form + Zod | Form handling & validation |
| Axios | HTTP client |
| SweetAlert2 | Alert & notification dialogs |
| Lucide React | Icons |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express v5 | Server & REST API |
| MongoDB + Mongoose | Database & ODM |
| Socket.io | Real-time bidirectional communication |
| ws + y-websocket | WebSocket server for collaborative editor sync |
| JWT + bcrypt | Authentication & password hashing |
| dotenv, cors, cookie-parser | Utilities & middleware |

---

## 📁 Project Structure

```
DevConnect/
├── frontend/          # React + Vite client
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── lib/
│   └── package.json
│
└── backend/           # Node.js + Express server
    ├── routes/
    ├── models/
    ├── controllers/
    ├── middleware/
    ├── app.js
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)

### 1. Clone the repository

```bash
git clone https://github.com/Aditya-coder1235/DevConnect
cd devconnect
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend server:

```bash
npm run dev
```

### 3. Setup Frontend

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_LOCAL=http://localhost:8080
VITE_API_PROD=https://devconnect-1-sl2s.onrender.com
```

Start the frontend:

```bash
npm run dev
```

### 4. Open in browser

```
http://localhost:5173
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👤 Author

Made with ❤️ by **[Aditya Girawale](https://github.com/Aditya-coder1235)**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat&logo=linkedin)](www.linkedin.com/in/aditya-girawale)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-black?style=flat&logo=github)](https://github.com/Aditya-coder1235)

---

⭐ If you found this project helpful, please give it a star!
