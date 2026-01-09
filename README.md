# auth-system-react-node

## Project Structure

- `backend/` - Node.js + Express + MongoDB APIs (Register/Login + JWT)
- `frontend/` - React + Vite UI (Tailwind CSS)

---

## How to Run (Step by Step)

### 1) Clone the repo

```bash
git clone https://github.com/rahul-adepu/auth-system-react-node.git
cd auth-system-react-node
```

---

### 2) Run Backend (Terminal 1)

#### Go to backend folder

```bash
cd backend
```

#### Install dependencies

```bash
npm install
```

#### Create `.env` file

Create a file named `.env` inside the `backend/` folder with:

```env
PORT=portnumber
MONGODB_URI=mongodb://localhost:27017/auth-system
JWT_SECRET=yoursecretkey
JWT_EXPIRE=7d
```

#### Start MongoDB

Make sure MongoDB is running locally (or use MongoDB Atlas by updating `MONGODB_URI`).

#### Start backend server

```bash
npm start
```

Backend will run on: `http://localhost:5000`

---

### 3) Run Frontend (Terminal 2)

#### Go to frontend folder

Open a new terminal, then:

```bash
cd frontend
```

#### Install dependencies

```bash
npm install
```

#### Start frontend server

```bash
npm run dev
```

Frontend will run on: `http://localhost:3000`

---

## Notes

- Keep **backend** and **frontend** running at the same time (two terminals).
- Frontend calls backend APIs at `http://localhost:5000`.

---

Thank you.
