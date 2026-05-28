# 🍦 Scoop - Premium E-Commerce Application

Scoop is a modern, high-performance, and feature-rich full-stack e-commerce web application for purchasing delicious ice creams. Built with a robust backend using Express, PostgreSQL, and Upstash Redis, and a sleek, animated frontend powered by React, TypeScript, Framer Motion, and Tailwind CSS.

---

## 🏗️ Project Architecture & Tech Stack

The project is structured as a mono-repository containing two core components:

```
Scoop/
├── backend/            # Express REST API (ES Modules)
└── frontend/           # React + TypeScript + Vite + Tailwind CSS
```

### Backend (API Server)
- **Runtime**: Node.js with ES Modules (`type: module`)
- **Web Framework**: Express (v5.x)
- **Database**: PostgreSQL (Neon Serverless Pool)
- **Caching & Carts**: Redis (Upstash)
- **Background Jobs**: BullMQ (handling async checkout tasks like emails)
- **Authentication**: JSON Web Tokens (JWT) & bcrypt password hashing
- **Payments**: Razorpay API integration

### Frontend (User Interface)
- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS + Autoprefixer
- **Animations**: Framer Motion (for premium micro-interactions and transitions)
- **Icons**: Lucide React
- **Routing**: Wouter (lightweight router)

---

## 📂 Project Directory Structure

```
Scoop/
├── backend/
│   ├── src/
│   │   ├── config/         # Database, Redis, and Queue setup
│   │   ├── controllers/    # API Request controllers (auth, cart, order, products)
│   │   ├── middleware/     # Auth checks and route guards
│   │   ├── routes/         # Express router entry points
│   │   ├── services/       # Custom application business logic
│   │   └── workers/        # BullMQ background workers
│   ├── .env.example        # Template for server-side environments
│   ├── index.js            # Express API Server entry point
│   └── package.json        # Backend NPM scripts and dependencies
│
└── frontend/
    ├── src/
    │   ├── assets/         # Images, fonts, and static assets
    │   ├── components/     # Reusable UI components
    │   ├── context/        # React Context stores (CartContext, AuthContext, etc.)
    │   ├── data/           # Static metadata and mock configurations
    │   ├── lib/            # Axios/Fetch API clients and wrappers
    │   ├── pages/          # Complete page components
    │   ├── index.css       # Core Tailwind CSS styles and custom variables
    │   └── main.tsx        # React client entry point
    ├── .env.example        # Template for client-side environments
    ├── index.html          # Frontend single page HTML
    ├── tailwind.config.js  # Tailwind CSS configuration
    └── package.json        # Frontend NPM scripts and dev tools
```

---

## 🗄️ Database Schema (PostgreSQL)

To run the application, ensure the following tables are created in your PostgreSQL database. You can run the following SQL queries to initialize the database:

```sql
-- 1. Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Products Table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INT DEFAULT 0,
    category VARCHAR(100),
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Orders Table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    items JSONB NOT NULL,                 -- Stores the array of ordered items and metadata
    total INT NOT NULL,                   -- Total order amount in paise (1 INR = 100 paise)
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'paid', 'failed'
    razorpay_order_id VARCHAR(255),       -- Tracks Razorpay payment order identifier
    payment_id VARCHAR(255),              -- Verified transaction receipt reference
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🚀 Local Development Setup

Follow these steps to run the application on your local machine:

### 1. Prerequisites
- **Node.js** (v18 or higher recommended)
- **PostgreSQL** instance (Neon.tech or local)
- **Redis** instance (Upstash Redis or local)

### 2. Configure Environment Variables
You need to set up `.env` files for both the frontend and backend.

#### Backend Env Setup:
Copy the backend environment template:
```bash
cp backend/.env.example backend/.env
```
Open `backend/.env` and update the placeholders with your credentials:
```env
PORT=5000
DATABASE_URL=your_postgresql_connection_string
REDIS_URL=your_redis_connection_url
REDIS_TOKEN=your_redis_access_token_if_needed
JWT_SECRET=your_jwt_signing_secret_key
RAZORPAY_KEY_ID=your_razorpay_test_key_id
RAZORPAY_KEY_SECRET=your_razorpay_test_key_secret
```

#### Frontend Env Setup:
Copy the frontend environment template:
```bash
cp frontend/.env.example frontend/.env
```
Open `frontend/.env` and verify the backend endpoint URL:
```env
VITE_API_BASE_URL=http://localhost:5000
```

### 3. Install Dependencies & Run

#### Backend Server
```bash
cd backend
npm install
npm run dev
```
The backend server will run on `http://localhost:5000` with hot reloading enabled.

#### Frontend Application
```bash
cd frontend
npm install
npm run dev
```
The React frontend will spin up on `http://localhost:5173`. Open this URL in your web browser to browse the catalog, add items to the cart, register/login, and place test orders!

---

## 🌐 Production Deployment Guide

Deploying Scoop to production is highly straightforward. Here are the recommended hosting paths:

### 1. Database (PostgreSQL) & Caching (Redis)
- **Database**: Use [Neon PostgreSQL](https://neon.tech/) for serverless scaling. Simply paste the connection string into the backend production config.
- **Cache / Cart**: Use [Upstash Redis](https://upstash.com/) for global, zero-config serverless Redis.

### 2. Backend Server Deployment (Express)
You can deploy the backend Express application on platforms like **Render**, **Railway**, or **Koyeb**:
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Environment Variables**:
  Add all variables from your `backend/.env` (DATABASE_URL, REDIS_URL, REDIS_TOKEN, JWT_SECRET, RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, and set `PORT` to standard web standard ports or let the provider specify it).

### 3. Frontend App Deployment (React + Vite)
Deploy the React frontend on **Vercel**, **Netlify**, or **GitHub Pages**:
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variables**:
  Add `VITE_API_BASE_URL` pointing to your deployed backend domain (e.g. `https://scoop-api.onrender.com`). No slash at the end.
- **SPAs Configuration**: If using Vercel or Netlify, configure URL redirects for Single Page Applications so that routes managed by `wouter` do not result in `404 Not Found` upon page reloads.
  - *Netlify (`_redirects` file in public/)*:
    `/* /index.html 200`
  - *Vercel (`vercel.json` in frontend/)*:
    ```json
    {
      "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
    }
    ```
