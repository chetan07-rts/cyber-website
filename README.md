# National Cyber Security Protection Portal (NCSPP)

A high-end, premium, and professional full-stack web application designed for a government cybersecurity organization. 

## Project Architecture
This is a Full-Stack MERN (MongoDB, Express, React, Node.js) application.
- **Frontend**: React (Vite), React Router v6, Axios, Vanilla CSS (Dark Cyber Theme)
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, Multer
- **Database**: MongoDB (Local or Atlas)

---

## Directory Structure
```text
NCSPP/
├── backend/                  # Node.js + Express API
│   ├── config/               # Database connection
│   ├── controllers/          # API Route controllers (Auth, Posts, Reports)
│   ├── middleware/           # JWT verification, Multer upload config
│   ├── models/               # Mongoose schemas (User, Report, AwarenessPost)
│   ├── routes/               # Express routes
│   ├── uploads/              # Local evidence file storage bucket
│   ├── .env                  # Environment Variables
│   ├── package.json          # Backend dependencies
│   └── server.js             # Express entry point
├── frontend/                 # React frontend
│   ├── public/         
│   ├── src/
│   │   ├── components/       # Reusable components (Navbar, Footer)
│   │   ├── pages/            # Home, About, Contact, Report, Awareness, Admin
│   │   ├── App.jsx           # Routing configuration
│   │   ├── index.css         # Global variables and dynamic CSS design system
│   │   └── main.jsx          # React DOM render
│   ├── package.json          # Frontend dependencies
│   └── vite.config.js        # Vite build tool config
└── README.md                 # You are here
```

---

## Installation & Setup Instructions

### Prerequisites
Make sure you have **Node.js** and **npm** installed on your system.
You will also need a running instance of **MongoDB** (either installed locally or via a MongoDB Atlas URI string).

### 1. Backend Setup

1. Open a terminal and navigate to the backend folder:
   ```bash
   cd NCSPP/backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `backend/.env.example` to `backend/.env` and replace every placeholder with your own values. Use a long, random `JWT_SECRET`, a strong admin password, and a separate random `INITIAL_ADMIN_SETUP_KEY`. The `.env` file is local-only and must not be committed. Change `MONGO_URI` if using MongoDB Atlas.
4. Start the backend server:
   ```bash
   npm run dev
   # OR
   npm start
   ```
   *The server will run on http://localhost:5000*

### 2. Frontend Setup

1. Open a **new** terminal window and navigate to the frontend folder:
   ```bash
   cd NCSPP/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite React development server:
   ```bash
   npm run dev
   ```
   *The frontend will run on http://localhost:3000 (or the port Vite issues).*

   ## Production Deployment

   The frontend is deployed to Vercel; the Express API runs as a Render web service. MongoDB Atlas stores application data, and Cloudinary stores uploaded evidence because Render's local filesystem is not persistent. Evidence is uploaded as authenticated Cloudinary media and the admin dashboard requests short-lived download links from the protected API. Use providers and plans appropriate for the sensitivity and retention requirements of submitted reports.

   ### 1. Create the production database and file storage

   1. Create a MongoDB Atlas database and a database user. Configure Atlas network access to allow connections from Render, then copy the database connection string for `MONGO_URI`.
   2. Create a Cloudinary account and note its cloud name, API key, and API secret. Keep these values private. If you want to allow evidence PDFs to be downloaded on a Cloudinary free account, enable PDF delivery in the product environment's Security settings.

   ### 2. Deploy the frontend to Vercel

   1. In Vercel, import `chetan07-rts/cyber-website` from GitHub.
   2. Set the project root directory to `frontend`. Vercel detects Vite; use `npm run build` as the build command and `dist` as the output directory.
   3. Add `VITE_API_URL` as an environment variable with a temporary value such as `https://example.onrender.com`, then deploy. Copy the resulting production URL.

   The Vercel rewrite configuration keeps client-side routes such as `/admin/login` working after refresh.

   ### 3. Deploy the API to Render

   1. In Render, create a new Blueprint and select this GitHub repository. Render reads the root `render.yaml` to configure the API service.
   2. Enter the Atlas connection string for `MONGO_URI`, the admin email and a unique strong `ADMIN_PASSWORD`, and the Cloudinary cloud name, API key, and API secret.
   3. Set `FRONTEND_URL` to the production Vercel URL. Render generates `JWT_SECRET` and `INITIAL_ADMIN_SETUP_KEY`.
   4. Deploy the service and copy its `onrender.com` URL. The `/api/health` endpoint reports whether the API is connected to MongoDB.

   ### 4. Connect the deployments and initialize the admin

   1. In Vercel project settings, set `VITE_API_URL` to the Render service URL (without a trailing slash), then redeploy the frontend.
   2. After the Render deployment is healthy, send a `POST` request to `https://YOUR-API.onrender.com/api/auth/register-initial` with the header `x-initial-admin-key` set to the generated `INITIAL_ADMIN_SETUP_KEY`.
   3. After the first admin is created, remove `INITIAL_ADMIN_SETUP_KEY` from the Render service environment and redeploy.
   4. Test the public pages, report submission and evidence links, then sign in at `/admin/login`.

   For local development, leave `VITE_API_URL` unset: the Vite development server proxies API and upload requests to `http://localhost:5000`.

   ---

   ## Using the System

### 1. Public Portal
Navigate to the frontend port in your browser. Citizens can view the Home, About, Awareness, and Contact pages.
To report a cyber crime, click **Report Threat**. They can fill the complex form, and attach a dummy evidence `.pdf` or `.png`.

### 2. Admin Initialization
Before you can login as an Admin, you need to seed the database with the first Admin account.
Set `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `INITIAL_ADMIN_SETUP_KEY` in `backend/.env`, then provide the setup key in the request header:

```bash
curl -X POST http://localhost:5000/api/auth/register-initial \
  -H "x-initial-admin-key: YOUR_INITIAL_ADMIN_SETUP_KEY"
```

The admin account is created with the configured email and password. Remove `INITIAL_ADMIN_SETUP_KEY` from the environment after setup. If the terminal returns `Admin already initialized`, an admin account already exists.

### 3. Admin Dashboard
Navigate to `http://localhost:3000/admin/login` in your browser.
Log in with the `ADMIN_EMAIL` and `ADMIN_PASSWORD` configured for the initial admin.
You will have access to the dashboard to:
1. View submitted Cyber Threat Reports, update their statuses, and view uploaded evidence.
2. Publish, manage, and delete new Cybersecurity Awareness posts which show to the public on the Awareness page.

---
**Developed by Antigravity AI.**
