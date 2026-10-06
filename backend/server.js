const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const connectDB = require('./config/db');
const fs = require('fs');

dotenv.config();

const app = express();
const allowedOrigins = [
  'http://localhost:3000',
  process.env.FRONTEND_URL?.replace(/\/+$/, ''),
].filter(Boolean);

// Local uploads are used only when Cloudinary is not configured.
const uploadDir = path.join(__dirname, 'uploads');
if (!process.env.CLOUDINARY_CLOUD_NAME && !fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Middlewares
app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    callback(new Error('Origin is not allowed by CORS'));
  },
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/api/health', (req, res) => {
  res.status(mongoose.connection.readyState === 1 ? 200 : 503).json({
    status: mongoose.connection.readyState === 1 ? 'ok' : 'database-unavailable',
  });
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/reports', require('./routes/reportRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));

// Error Handler Middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const startServer = async () => {
  await connectDB();
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();
