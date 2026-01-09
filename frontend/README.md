# Frontend - Authentication System

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Styling (Tailwind CSS)

This frontend uses **Tailwind CSS** (no component `.css` files). Tailwind is configured via:

- `tailwind.config.js`
- `postcss.config.cjs`
- `src/index.css` (Tailwind directives)

## Features

- **Login Page**: Dark-themed login form matching the design requirements
- **Registration Page**: User registration with Name, Date of Birth, Email, and Password
- **Protected Dashboard**: User management table (accessible only after login)
- **LocalStorage**: Automatically saves user data and JWT token after login/registration
- **Route Protection**: Prevents access to dashboard without authentication

## Project Structure

```
frontend/
├── src/
│   ├── components/       # Reusable components (Login, Register, ProtectedRoute)
│   ├── pages/            # Page components (Dashboard)
│   ├── services/         # API service layer
│   ├── utils/            # Utility functions (auth helpers)
│   ├── App.jsx           # Main app component with routing
│   └── main.jsx          # Entry point
├── public/               # Static assets
└── package.json          # Dependencies
```

## API Configuration

The API base URL is configured in `src/services/api.js`. Make sure your backend is running on `http://localhost:5000`.

