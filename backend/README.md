# Backend - Authentication System

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the backend directory (copy from `.env.example`):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/auth-system
JWT_SECRET=your-secret-key-change-this-in-production
JWT_EXPIRE=7d
```

3. Make sure MongoDB is running on your system.

4. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

### Register User
- **POST** `/api/auth/register`
- Body: `{ name, dateOfBirth, email, password }`
- Returns: JWT token and user information

### Login User
- **POST** `/api/auth/login`
- Body: `{ email, password }`
- Returns: JWT token and user information

### Get Current User
- **GET** `/api/auth/me`
- Headers: `Authorization: Bearer <token>`
- Returns: Current user information

