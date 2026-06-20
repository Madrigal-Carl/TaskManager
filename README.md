# TaskManager

This repository contains a full-stack task management application with a Node.js/Express/MongoDB backend and a React/Vite frontend.

## Project Structure

- `backend/` - Express API server
- `frontend/` - React application built with Vite

## Prerequisites

- Node.js 18+ installed
- npm installed
- MongoDB instance available (local or cloud)

## Clone the repository

```bash
git clone https://github.com/Madrigal-Carl/TaskManager.git
cd TaskManager
```

## Setup

### Backend

1. Go to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the environment example file:
   ```bash
   cp .env.example .env
   ```
   On Windows PowerShell, use:
   ```powershell
   Copy-Item .env.example .env
   ```
4. Open `backend/.env` and set your MongoDB connection string:
   ```env
   MONGO_URI=your-mongodb-connection-string
   PORT=5000
   ```

### Frontend

1. Go to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the environment example file:
   ```bash
   cp .env.example .env
   ```
   On Windows PowerShell, use:
   ```powershell
   Copy-Item .env.example .env
   ```
4. Configure any frontend environment values if needed in `frontend/.env`.

## Running the Application

### Backend

From `backend/`:

- Start in development mode with automatic restarts:
  ```bash
  npm run dev
  ```
- Start normally:
  ```bash
  npm start
  ```
- Seed sample tasks into the database:
  ```bash
  npm run seed
  ```

The backend server listens on `http://localhost:5000` by default.

### Frontend

From `frontend/`:

- Start the development server:
  ```bash
  npm run dev
  ```
- Build the production app:
  ```bash
  npm run build
  ```
- Preview the production build locally:
  ```bash
  npm run preview
  ```

The frontend development server typically runs on `http://localhost:5173`.

## Dependencies

### Backend

- `express`
- `mongoose`
- `cors`
- `dotenv`
- `helmet`
- `morgan`
- `@faker-js/faker`
- `zod`

### Frontend

- `react`
- `react-dom`
- `react-hook-form`
- `@tanstack/react-query`
- `axios`
- `zod`
- `lucide-react`
- `@hookform/resolvers`

## Notes

- Ensure `MONGO_URI` is set before starting the backend.
- Run the backend server before opening the frontend app so API requests resolve correctly.
- If the backend runs on a different port or host, update the frontend API configuration accordingly.
